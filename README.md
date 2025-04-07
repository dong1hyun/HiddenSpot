# 히든스팟

![Badge](https://img.shields.io/badge/version-1.0.1-blue.svg)
<br/><br/>

## 📱주요 화면

<table>
  <tr>
    <td align="center">
      <img src="https://github.com/user-attachments/assets/cdc20ee3-74eb-4c9c-a3fe-e4de497b4ee9" width="200" /><br/>
      <b>홈 화면</b>
    </td>
    <td align="center">
      <img src="https://github.com/user-attachments/assets/655c3bfe-1506-4b04-8fb5-62f1d4dceec5" width="200" /><br/>
      <b>상세 화면</b>
    </td>
    <td align="center">
      <img src="https://github.com/user-attachments/assets/55663e59-121c-4648-aa57-0f2c101b8d69" width="200" /><br/>
      <b>사용자 정보 화면</b>
    </td>
    <td align="center">
      <img src="https://github.com/user-attachments/assets/46d7e68b-2367-4e57-9ffd-4b3ed055cd27" width="200" /><br/>
      <b>지도 화면</b>
    </td>
  </tr>
</table>
<br/><br/>

## 🔍주요기능
- 자신만 알고있는 히든스팟을 다른 사람들에게 공유
- 자신이 가고자 하는 여행지의 히든스팟을 지도에서 찾고, 저장해서 자신의 여정을 풍요롭게 만들 수 있음
- 태그 필터링을 통해 자신의 취향에 맞는 장소들을 추천받을 수 있음
- 자동완성 검색 기능을 이용해서 편리하게 특정 장소에 대한 정보를 찾을 수 있음
<br/><br/>

## 📌 개요
자신만 알고있는 숨겨져있는 사진스팟, 아름다운 장소를 다른 사람들과 공유하는 어플리케이션입니다. </br>
지도에 있는 히든스팟을 따라가며 자신의 여정을 풍요롭게 만들 수 있습니다.
<br/><br/>

## 🛠 기술 스택
- **Frontend**: ReactNative, TypeScript, ReactQuery ReactHookForm
- **Backend**: Node.js, Express, Prisma
- **Database**: PostgreSQL
- **Storage**: Supabase Storage
- **Auth**: Supabase Authentication
<br/><br/>

## 📦 주요 라이브러리 및 버전

- React Native: `0.76.7`
- Expo SDK: `52.0.41`
- React: `18.3.1`
- React Navigation: `^7.x`
- Supabase JS: `^2.49.1`
- Zustand: `^5.0.3`
- React Query: `^5.40.0`
- React Hook Form: `^7.54.2`
- TypeScript: `^5.3.3`
<br/><br/>

## 🚀 설치 및 실행
```sh

# 의존성 설치
npm install

# express 서버 실행
cd Backend
npm run dev

# 안드로이드에서 실행
npx expo run:android

# Android 빌드 (릴리스 APK 생성)
cd android
./gradlew assembleRelease

# Android AAB 빌드 (Google Play 배포용)
cd android
./gradlew bundleRelease

```
<br/><br/>
## 📦 Supabase Client 설정

### 1️⃣ Supabase 프로젝트 생성
- [Supabase](https://supabase.com/)에 로그인 후 새 프로젝트를 생성합니다.
### 2️⃣ 환경 변수 설정
Supabase Project에서 Configuration > Data API > URL, API key를 가져옴 <br/>
`.env` 파일에 Supabase API 키 추가:
```sh
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key
```
### 3️⃣ Supabase Client 생성
```sh
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANONKEY, {
  auth: {
    storage: AsyncStorage, // 사용자의 로그인 세션을 AsyncStorage에 저장
    autoRefreshToken: true, // 액세스 토큰 자동 갱신 활성화
    persistSession: true, 앱을 재시작해도 로그인 상태 유지
    detectSessionInUrl: false, // URL을 통해 세션을 감지하지 않음(어플리케이션)
  },
})
```
<br/><br/>

## 🔑 Supabase OTP Auth

### otp 인증을 위한 email form 설정
![image](https://github.com/user-attachments/assets/94b41d3a-989d-42ff-a09c-578d041f4123)

<br/>

### 입력받은 이메일로 otp 코드 전송

```sh
const { error } = await supabase.auth.signInWithOtp({
  email: email,
  options: {
    shouldCreateUser: true,
  }
})
```
<br/>

### 입력받은 otp 코드로 회원가입 혹은 로그인 (이미 존재하는 계정인 경우 로그인)

```sh
await supabase.auth.verifyOtp({
  email,
  token,
  type: 'email',
})
```
<br/><br/>
## 📦 Supabase Storage

- 사용자가 이미지를 업로드하면 이미지를 storage에 저장합니다.
- 정상적으로 저장됐다면 해당 이미지의 경로를 얻을 수 있고, 그 경로를 통해 이미지 주소를 요청할 수 있습니다.

- 우선 Supabse Storage 사용하기 위해서 Project에서 bucket을 생성합니다.

![image](https://github.com/user-attachments/assets/e8a75ba5-6193-46da-b1a1-6fab756f3ff4)

- 저장된 이미지를 어플을 이용하는 모든 사람들에게 제공해야 하기 때문에 public으로 설정합니다.

![image](https://github.com/user-attachments/assets/992033b8-388e-4b81-9473-093d12041ef4)



### 이미지를 Supabase Storage에 저장

```sh
const response = await fetch(image);

// 컨테츠 타입 추론
const contentType = response.headers.get("content-type") || "application/octet-stream";

// arrayBuffer(이진 데이터를 저장하는 고정 크기의 메모리 버퍼) 생성
const arrayBuffer = await response.arrayBuffer();
const buffer = Buffer.from(arrayBuffer);

const { data, error } = await supabase.storage
    .from("photos") // 여기에는 내가 설정한 bucket의 이름으로 설정합니다.
    .upload(`public/${Date.now()}.png`, buffer, {
        contentType: contentType,
    });

```

storage에 이미지를 올리면 반환되는 data에 있는 path를 통해서 storage의 이미지 url를 얻을 수 있습니다.
```sh
const imageUrl = supabase.storage
    .from('photos')
    .getPublicUrl(data.path).data.publicUrl
```

<br/><br/><br/>

# 🖥️ Vercel Express Server 배포

### 1️⃣ Vercel 프로젝트 생성
- [Vercel](https://vercel.com)에 로그인 후 새 프로젝트를 생성합니다.

express에 대한 preset이 없기때문에 other을 선택합니다.
<br/>
![image](https://github.com/user-attachments/assets/0dcd53d9-87eb-4f8f-9585-eaaeb55f494a)

### 2️⃣ 환경 변수 설정
- DATABASE_URL을 설정해줍니다.
- DATABASE는 Supabse의 PostgreSQL + Prisma를 사용할 것이기 때문에 Supabase에서 Url을 복사해서 설정해주세요.
<br/>

![image](https://github.com/user-attachments/assets/80659980-f0cd-4720-957e-f6881bd44e25)

### 3️⃣ Backend root 폴더에 vercel.json을 생성하고 진입점을 정의해줍니다.

- 서버 진입점 정의 (진입점: /api/index.js)

```sh
{ "version": 2, "rewrites": [{ "source": "/(.*)", "destination": "/api" }] }
```
