# 🔐 개인정보처리방침 안내 웹페이지 - 구현 기능 정리

## 📌 프로젝트 개요

본 프로젝트는 **아동·청소년 눈높이에서 개인정보 처리방침을 이해하도록 돕는 웹 기반 채팅형 교육 콘텐츠**입니다.  
Bootstrap 기반 UI와 JavaScript를 활용해 몰입감 있는 학습을 제공합니다.

---

## 🧩 주요 기능 요약

### 1. 💬 채팅형 콘텐츠 구조화

- 각 메시지는 `sender`, `mood`, `message`로 구성된 객체 배열로 관리
- `<br>`, `<b>`, `<i>` 등 HTML 태그 포함 가능
- 감정 상태(`mood`)를 기반으로 프로필 이미지 및 말풍선 스타일 변화

```js
{
  sender: 'Lockstar',
  mood: 'lockstar',
  message: '안녕하세요!<br><b>개인정보</b>는 <i>소중한</i> 정보예요.'
}
```

---

### 2. 🗂️ 시나리오 카테고리 분류

- 총 5개 시나리오 (`chatData1` ~ `chatData5`) 로 분리
- 탭 버튼 클릭 시 해당 주제의 대화 데이터를 동적 로딩
- 각 카테고리 내용:

| 카테고리 | 설명 |
|----------|------|
| 개인정보보호 탐험대란? | 개인정보 개념 소개 |
| 개인정보 수집 | 수집 방식 및 예시 |
| 개인정보 이용 | 활용 사례 및 목적 |
| 개인정보 제공 | 제3자 제공 및 위탁 |
| 개인정보 삭제 | 파기 및 분리 보관 절차 |

---

### 3. 🔄 탭 기반 콘텐츠 전환

- 각 버튼에 `data-chat="N"` 속성 부여
- 클릭 시 기존 메시지 초기화 후 새로운 데이터 출력
- `.active` 클래스 자동 전환으로 시각적 위치 표시

---

### 4. ⌨️ 타이핑 애니메이션 효과

- `setTimeout` 기반 타이핑 출력 (`typingSpeed` 조절 가능)
- HTML 태그는 한 덩어리로 처리하여 자연스럽게 출력
- 대화 몰입도 및 UX 향상

---

### 5. 🧠 동일 화자 처리 및 말풍선 정렬

- 첫 등장 화자를 기준으로 좌우 정렬 결정 (기본: Lockstar 좌측)
- 연속 화자일 경우 프로필 이미지 숨김, 말풍선 꼬리 제거

---

### 6. 🖼️ 감정 상태에 따른 프로필 표현

- `mood` 값에 따라 동적으로 프로필 이미지 스타일 변경
- CSS의 `background-image` 활용

---

### 7. 🛠️ 모듈화 및 유지보수 최적화

- 각 `chat-data-N.js` 파일 별도 분리
- 공통 렌더링 로직 `chat-handler.js`에서 일괄 관리
- 전역 변수 `window.chatData` 로 스크립트 간 데이터 연결

---

### 8. 📁 경로 및 오류 대응

- 상대경로(`../images/...`) 문제 해결
- 오타 통일 (`locktar` → `lockstar`)
- `<script id="chat-data-script">` 사용하여 중복 로딩 방지

---

## 🧰 기술 스택

- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Framework**: Bootstrap 5.2.2
- **폰트**: Pretendard, 강원교육튼튼, 모두

---

## 📎 부가 정보

- 자동 시작: `DOMContentLoaded` 시 기본 채팅(`chatData1`) 자동 출력
- 반응형 레이아웃 적용으로 모바일/데스크탑 환경 모두 대응
- 향후 CSV 기반 입력 → 객체 자동 변환 기능 확장 예정

---

## 📷 예시 화면

<p align="center">
  <img src="/example/index_img.png" alt="메인 화면" width="30%" style="margin-right: 10px;">
  <img src="/example/about_img.png" alt="소개 화면" width="30%" style="margin-right: 10px;">
  <img src="/example/cardnews_img.png" alt="카드뉴스 화면" width="30%">
</p>
