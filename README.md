# 카드 맞추기 게임

<br />

## 개요

### 기획의도
+ 리액트 공부를 위한 프로젝트 
  + 컴포넌트 사이의 값, 함수 전달을 학습하기 위해 Redux 라이브러리는 배제
  + css-module 사용

### 디자인컨셉
+ 외부 이미지 없이 CSS로 디자인 구현

### 주요기능
+ 컴퓨터와의 대전 기능 및 난이도 옵션 구현
+ 타이머 기능 및 제한 없음 옵션 구현
+ 반응형 페이지로 제작
+ 입력창 커스텀 디자인 적용 및 접근성을 고려하여 탭키로 접근 가능하도록 제작
+ 외부 이미지 없이 CSS로 디자인 

### 기간
+ 2023-09-01 ~ 2023-11-14
  
### 인원
+ 1인
   
### 링크
+ [피그마](https://www.figma.com/file/18oZ5fY88khXRZmIaKN5Yj/MatchingCard?type=design&node-id=0-1&mode=design&t=CJmv1sZihV10cdHF-0)
+ [구현사이트(자바스크립트 버전)](https://uauu89.github.io/cardMatch/src/test.html)
+ [구현사이트(리액트 버전)](https://uauu89.github.io/cardMatch/build/)


<br />

---

<br />
<br />

## 수정내역
<details>

#### 23.09.13

1. > + AI 알고리즘 제작 중 
   > + 첫 턴에서 무조건 랜덤 선택(이미 오픈한 카드 재 오픈) + 첫 턴에서 선택한 숫자와 동일한 숫자만 선택하는 오류 있음

#### 23.09.24
    
1.  > + ai 알고리즘 완성, 테스트 필요
    > + 1차 카드 디자인 

#### 23.09.25

1.  > + 1차 카드 UI 디자인
    > + 스크린 500px 이하에서 카드크기 조절
    > + 네이버 앱에서 keyframes > rotate 작동 안하는 오류 수정
    
#### 23.09.26

1.  > + 스크린 500px 이하에서 ui 사이즈 축소
    > + 타이머 기능 / 난이도 기능 1차 추가, 테스트 필요
    > + 예정 : 
    >   + 작업중 : 옵션 기능
    >   + 타이머 초기화 (타이머 변경 시 / 새 게임 시작 시) → 컴퓨터 턴도 중지

#### 23.09.27

1.  > + 작업중 : 옵션 기능

#### 23.10.01

1.  > + 작업중 : 난이도 세부 내용 아코디언 메뉴 그리드로 구현, 다른 부분도 그리드로 변경
    > + 예정 : 
    >   + 정답 시 연속 선택 옵션 구현하기 → checkMatching 함수 내용 변경하기
    
#### 23.10.04

1.  > + 게임 종료 함수
    > + 아코디언 메뉴 그리드로 변경
    > + 정답 시 턴 유지 기능 구현
    > + 점수체계 추가
    > + 싱글모드에서 컴퓨터 작동하는 오류 수정
    > + 싱글모드에서 카운트 종료 후 재 작동 안하는 오류 수정
    > + 점수체계 추가
    > + 예정 : 
    >   + 정답 시 연속 선택 옵션 구현하기 → checkMatching 함수 내용 변경하기
    >   + 460px 이하에서 반응형 수정하기
    >   + 게임 시작 시 clearInterval / clearTimeout 확실하게 적용시키기
        
#### 23.10.05

1.  > + 게임 재시작 시 콤보 초기화 안되는 오류 수정
    >   + (init함수에 score_combo = 0 추가)
    > + 싱글모드 시간제한 없음 체크 시 타이머 깜빡꺼리는 현상 수정
    >   + (turn_single함수 > count_stop함수 실행할 때 조건문 추가)
    > + 정답 시 턴 유지 기능 구현
    > + 점수체계 추가
    > + 싱글모드에서 컴퓨터 작동하는 오류 수정
    > + 싱글모드에서 카운트 종료 후 재 작동 안하는 오류 수정
    > + 점수체계 추가
    > + 예정 : 
    >   + 정답 시 연속 선택 옵션 구현하기 → checkMatching 함수 내용 변경하기
    >   + 460px 이하에서 반응형 수정하기
    >   + 게임 시작 시 clearInterval / clearTimeout 확실하게 적용시키기
        
#### 23.10.12

1.  > + 타이머 중복 차감 오류 수정
    >   + (func_timeCounter === null 조건 추가)

#### 23.10.27

1.  > + README.md 추가
    > + 게임결과 모달에 새 게임 버튼 추가
    > + 새 게임 버튼 클릭 시 옵션창 닫히도록 수정

#### 23.11.01

1.  > + 리액트로 변환 작업 중 → 옵션 창 작업 중
    >   + 불필요한 재 렌더링 막기 위해 옵션 항목 컴포넌트화 
    >   + 입력 값 유효성 검사 기능 추가
    >   + 키보드 접근성 고려

#### 23.11.05

1.  > + 리액트로 변환 작업 중 → 게임 진행 관련 기능 작업중
    >   + 조건으로 fontawesome 제거 시 Failed to execute 'removeChild' on 'Node' 에러   
        → hidden 클래스 추가

#### 23.11.06

1.  > + 싱글모드 기능 변환 완료, 버그 테스트 필요
    > + 클릭 딜레이 삭제 
    > + setTimeout, setInterval 동작 완료/새 게임 시작 시 clear 이벤트 추가 중

    > <br />
       
2.  > + 대전모드 작업
    > + 타이머에 누락된 턴 표시 컬러 추가
    > + 카드 자동 사이즈 변경 옵션 에러 수정

#### 23.11.07

1.  > + play state 추가, 타이머 중단 조건을 play / whosTurn으로 세분화하여 기존 함수를 comTurn()에도 활용할 수 있도록 수정
    > + GameOverNotice 컴포넌트 보완
    > + Gameboard 컴포넌트에서 바로 comTurn() 작성 시 setTurnCount가 적용되지 않아 compCom 컴포넌트 새로 작성
    > + 컴퓨터 알고리즘 작성 중
    > + state 이름 수정 → 카드 배열 관련 state를 cardArray로 시작하도록 통일
    > + cardArrayOpend에도 정답 카드의 값을 0으로 변경하도록 수정

#### 23.11.08
1.  > + 컴퓨터 알고리즘 작성, 테스트 필요  
    > ※ 테스트를 위해 아래 내용 추가, 테스트 끝나고 재 수정하기
    >   1. setTimeout 시간 2초 수정
    >   2. state 및 본문 텍스트 추가   

#### 23.11.10
1.  > + 누락된 새 게임 버튼 기능 보완
    > + 새 게임 버튼 클릭 시 옵션 모달창 닫히는 기능을 기본값으로 추가
    > + 위 기능 구현을 위해서 openModal state를 header 컴포넌트에서 app 컴포넌트로 이동
    > + 새 게임 버튼 마우스오버시 아이콘 회전기능 복구
    > + 옵션 난이도 세부내용 탭 닫았을 시 탭 키 포커스 안되도록 수정
    > + input type=number 에서 엔터키 입력했을 시 다음 input으로 포커스 이동하는 기능 임시 구현(카드범위 → 시간제한 / 난이도 세부내용 그룹에서 이동)  
    자세한 기능 구현 여부는 고민중
    > + 파비콘 추가
    > + 반응형 CSS 작성  
    > <br />  
2.  > + 옵션 → 카드 범위, 카드 확인 여부 기본 값 변경
    > + 새 게임 버튼 클릭 시 아코디언 메뉴 닫히는 기능을 기본값으로 추가
    > + 위 기능 구현을 위해서 openBtn state를 header 컴포넌트에서 app 컴포넌트로 이동
    > + 반응형에서 타이머 위치 조정
    > + 각 컴포넌트 console.log 삭제
    > + 그 외 css, 텍스트 수정


#### 23.11.14
1.  > + 모바일에서 옵션 모달창 padding-bottom 추가
    > + 난이도 기본 값 변경

#### 23.12.29
1.  > + 대전모드에서 누락된 '정답 시 턴 유지 기능' 추가, 테스트 필요
    >   + whosTurn 스테이트 변경 부분을 changeTurn()으로 분리  
    >   + resetWhosTurn() 내용 수정
    >   + CompCom.js 에서 useEffect 조건에 props.play 추가
    > + resetWhosTurn() → if(props.gameOver) 조건에서 무의미한 내용 삭제
    >   + alert('game over') → 테스트 목적 코드로 예상되어 삭제
    >   + props.setPlay(false) → 중복 코드 삭제

#### 24.01.03
1.  > + README.md 잘못된 내용 수정

#### 24.01.09
1.  > + git에 build 폴더 추가  
    ><br />
2.  > + 현재 repository 에서 배포 페이지 작동 확인 및 README.md 경로 수정  
    ><br />   
3.  > + build 내부경로 수정 (/build 추가)
    


</details>