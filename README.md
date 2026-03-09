# Bookbank v0.1 Skeleton

Next.js(App Router) + TypeScript + Tailwind + Firebase(Auth/Firestore) 기반 온라인 독서통장 스켈레톤입니다.

## 시작하기

1. 의존성 설치

```bash
npm install
```

2. Firebase 콘솔에서 웹앱 구성값을 확인해 `.env.local` 파일 생성

```bash
cp .env.example .env.local
```

3. `.env.local`에 값 입력

- `NEXT_PUBLIC_FIREBASE_API_KEY`
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
- `NEXT_PUBLIC_FIREBASE_APP_ID`
- `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` (선택)

4. 개발 서버 실행

```bash
npm run dev
```

## v0.1 구현 범위

- 교사 회원가입(`/signup`) 및 로그인(`/login`)
- 역할 기반 화면 분기 (teacher → `/teacher`, student → `/student`)
- 학생 기록 추가(`/student/new`) 및 목록 조회
- 교사 화면에서 본인 `teacherId`의 최신 기록 20개 조회
- 리뷰 100자 제한(프론트 + Firestore Rules)
- 중복 저장 차단(`entryId = ${studentUid}_${bookId}` + 트랜잭션 + Rules)

## 테스트 학생 계정 만드는 방법(임시)

1. Firebase Authentication에서 이메일/비밀번호 학생 계정을 수동 생성
2. 생성된 uid로 Firestore `users/{uid}` 문서를 수동 생성
3. 아래 구조를 저장

```json
{
  "role": "student",
  "realName": "홍길동",
  "teacherId": "<교사 uid>"
}
```

> `realName`과 `teacherId`가 없으면 학생 기록 저장이 차단됩니다.

## Firestore Rules 반영

`firebase/firestore.rules`를 Firebase CLI 또는 콘솔에 반영하세요.

## 현재 제약/추후 보완

- TODO: 학생 계정 자동 발급 Cloud Function(`createStudentAccount`)
- TODO: classes 모델 및 교사 대시보드 통계 캐시
- TODO: Google Books API 기반 책 검색/자동 표지
- TODO: 저금 애니메이션 및 배포 자동화
