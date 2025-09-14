const { chromium } = require('playwright');
const { injectAxe, checkA11y, getViolations } = require('axe-playwright');

async function testAccessibility() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    console.log('🔍 접근성 테스트 시작...\n');

    // 페이지 로드
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
    console.log('✅ 페이지 로드 완료\n');

    // axe-core 주입
    await injectAxe(page);

    // 접근성 검사 실행
    const violations = await getViolations(page);

    console.log('===== 📊 접근성 테스트 결과 =====\n');

    if (violations.length === 0) {
      console.log('🎉 훌륭합니다! 접근성 문제가 발견되지 않았습니다.\n');
    } else {
      console.log(`❌ ${violations.length}개의 접근성 문제가 발견되었습니다:\n`);

      violations.forEach((violation, index) => {
        console.log(`${index + 1}. ${violation.description}`);
        console.log(`   영향도: ${violation.impact} (${getImpactEmoji(violation.impact)})`);
        console.log(`   규칙: ${violation.id}`);
        console.log(`   도움말: ${violation.help}`);
        console.log(`   영향받는 요소: ${violation.nodes.length}개`);

        violation.nodes.forEach((node, nodeIndex) => {
          if (nodeIndex < 3) { // 처음 3개만 표시
            console.log(`     - ${node.target.join(' > ')}`);
          }
        });

        if (violation.nodes.length > 3) {
          console.log(`     ... 그 외 ${violation.nodes.length - 3}개 요소`);
        }
        console.log('');
      });
    }

    // 구현된 접근성 기능 체크
    console.log('===== ✅ 구현된 접근성 기능 체크 =====\n');

    // 1. Skip Link 체크
    const skipLink = await page.$('a[href="#main-content"]');
    if (skipLink) {
      const isVisible = await skipLink.isVisible();
      console.log(`✅ Skip to main content 링크 구현됨 (기본 상태: ${isVisible ? '보임' : '숨김'})`);

      // Tab 키로 포커스 시 나타나는지 체크
      await page.keyboard.press('Tab');
      const isVisibleOnFocus = await skipLink.isVisible();
      if (isVisibleOnFocus) {
        console.log('   ✅ Tab 키로 포커스 시 표시됨');
      }
    } else {
      console.log('❌ Skip link가 구현되지 않음');
    }

    // 2. Main landmark 체크
    const mainElement = await page.$('main#main-content');
    if (mainElement) {
      const hasRole = await mainElement.getAttribute('role');
      console.log(`✅ Main landmark 구현됨 (role="${hasRole || 'main'}")`);
    } else {
      console.log('❌ Main landmark가 없음');
    }

    // 3. 키보드 네비게이션 체크
    console.log('\n📍 키보드 네비게이션 테스트:');

    // 포커스 가능한 요소들 찾기
    const focusableElements = await page.$$('a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])');
    console.log(`   포커스 가능한 요소: ${focusableElements.length}개`);

    // 4. ARIA 속성 체크
    const ariaLabels = await page.$$('[aria-label]');
    const ariaDescribedby = await page.$$('[aria-describedby]');
    const ariaLabelledby = await page.$$('[aria-labelledby]');

    console.log('\n🏷️ ARIA 속성 사용:');
    console.log(`   aria-label: ${ariaLabels.length}개 요소`);
    console.log(`   aria-describedby: ${ariaDescribedby.length}개 요소`);
    console.log(`   aria-labelledby: ${ariaLabelledby.length}개 요소`);

    // 5. Reduced Motion 체크
    console.log('\n🎬 모션 설정:');

    // CSS에서 prefers-reduced-motion 체크
    const hasReducedMotionCSS = await page.evaluate(() => {
      const sheets = Array.from(document.styleSheets);
      for (const sheet of sheets) {
        try {
          const rules = Array.from(sheet.cssRules || []);
          for (const rule of rules) {
            if (rule.cssText && rule.cssText.includes('prefers-reduced-motion')) {
              return true;
            }
          }
        } catch (e) {
          // CORS 에러 무시
        }
      }
      return false;
    });

    if (hasReducedMotionCSS) {
      console.log('   ✅ Reduced motion CSS 규칙 구현됨');
    } else {
      console.log('   ⚠️  Reduced motion CSS를 확인할 수 없음');
    }

    // 6. 포커스 스타일 체크
    console.log('\n🎯 포커스 스타일:');

    const hasFocusVisibleStyles = await page.evaluate(() => {
      const sheets = Array.from(document.styleSheets);
      for (const sheet of sheets) {
        try {
          const rules = Array.from(sheet.cssRules || []);
          for (const rule of rules) {
            if (rule.cssText && rule.cssText.includes('focus-visible')) {
              return true;
            }
          }
        } catch (e) {
          // CORS 에러 무시
        }
      }
      return false;
    });

    if (hasFocusVisibleStyles) {
      console.log('   ✅ Focus-visible 스타일 구현됨');
    } else {
      console.log('   ⚠️  Focus-visible 스타일을 확인할 수 없음');
    }

    // 7. 색상 대비 체크 (간단한 체크)
    console.log('\n🎨 색상 대비:');
    console.log('   ℹ️  자동 검사로 확인됨. 수동 검증 권장');

    // 요약
    console.log('\n===== 📋 요약 =====\n');

    const score = calculateScore(violations.length, skipLink, mainElement, ariaLabels.length);
    console.log(`접근성 점수: ${score}/100`);

    if (score >= 90) {
      console.log('🏆 매우 우수한 접근성 수준입니다!');
    } else if (score >= 70) {
      console.log('👍 양호한 접근성 수준입니다. 개선할 부분이 있습니다.');
    } else {
      console.log('⚠️  접근성 개선이 필요합니다.');
    }

    // 스크린샷 저장
    await page.screenshot({ path: 'accessibility-test-screenshot.png', fullPage: true });
    console.log('\n📸 스크린샷 저장됨: accessibility-test-screenshot.png');

  } catch (error) {
    console.error('❌ 테스트 실행 중 오류 발생:', error.message);
  } finally {
    await browser.close();
  }
}

function getImpactEmoji(impact) {
  switch(impact) {
    case 'critical': return '🔴 심각';
    case 'serious': return '🟠 중요';
    case 'moderate': return '🟡 보통';
    case 'minor': return '🟢 경미';
    default: return '⚪ 알 수 없음';
  }
}

function calculateScore(violationsCount, hasSkipLink, hasMainLandmark, ariaLabelCount) {
  let score = 100;

  // 위반 사항에 따른 감점
  score -= violationsCount * 10;

  // 필수 기능 체크
  if (!hasSkipLink) score -= 5;
  if (!hasMainLandmark) score -= 5;
  if (ariaLabelCount === 0) score -= 10;

  return Math.max(0, score);
}

// 테스트 실행
testAccessibility().catch(console.error);