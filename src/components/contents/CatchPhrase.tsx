import React from "react";

const CatchPhrase: React.FC = () => {
  return (
    <div className="container mx-auto">
      <div className="font-title text-8xl mt-10">저는 전명규라고 합니다.</div>
      <div className="font-text text-3xl font-semibold text-gray-400 mt-5">
        Who am I? What experiences have I had so far?
      </div>
      <div className="font-text text-2xl mt-4 whitespace-pre-line leading-relaxed mt-20">
        안녕하세요, 저는 전명규라고 합니다. 중앙대학교에서 영어영문학과
        일어일문학을 전공했으며, 2년간 영어 강사로 근무했습니다. 이후 3년
        3개월간 공군 학사장교로 복무를 마치고 중위로서 만기 제대를 했습니다.
        전역 후에는 국비 지원 교육을 통해 프로그래밍에 입문하게 되었고, 2년 간
        개인 사이트를 운영하며 개발을 진행했습니다. 이후에는 KT에서 운영하는
        빅데이터 교육인 에이블스쿨을 수료하고 현재는 그룹사인 KT cs에서 소속
        풀스택 엔지니어로서 활동하고 있습니다. 지금까지는 백엔드, 프론트엔드를
        중심으로 개발을 진행했지만, 지속적인 학습을 통해 머신러닝/딥러닝, CI/CD,
        블록체인 등 다양한 분야의 기술을 프로젝트에 적용하고 발전시키는 개발자를
        목표로 하고 있습니다.
      </div>
    </div>
  );
};

export default CatchPhrase;
