import React from "react";

const CatchPhrase: React.FC = () => {
  return (
    <>
      <div className="text-lg">제 이름은</div>
      <div className="text-4xl mt-2 md:mt-0 md:ml-4">전명규입니다.</div>
      <pre className="text-base mt-4">
        "저는 영어영문학을 전공한 풀스택 엔지니어입니다. 그리고
        머신러닝/딥러닝에 대해서도 공부했습니다."
      </pre>
      <div className="nav-item flex items-center mt-6">
        <button
          className="btn btn-lg border-2 border-primary text-primary py-2 px-4 hover:bg-primary hover:text-white transition-all duration-300"
          id="email"
        >
          이메일로 포지션 제안하기
        </button>
      </div>
    </>
  );
};

export default CatchPhrase;
