# 히든스팟

![Badge](https://img.shields.io/badge/version-1.0.0-blue.svg)
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
Supabase Project에서 Configuration > Data API > URL, API key를 가져옴
`.env` 파일에 Supabase API 키 추가:
```sh
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key
```
### 3️⃣ Supabase Client 생성
```sh
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANONKEY, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})
```
<br/><br/>

## 🔑 Supabase OTP Auth

otp 인증을 위한 email form 설정
![image](https://github.com/user-attachments/assets/94b41d3a-989d-42ff-a09c-578d041f4123)

<br/>
입력받은 이메일로 otp 코드 전송

```sh
const { error } = await supabase.auth.signInWithOtp({
  email: email,
  options: {
    shouldCreateUser: true,
  }
})
```
<br/>
입력받은 otp 코드로 회원가입 혹은 로그인 (이미 존재하는 계정인 경우 로그인)

```sh
await supabase.auth.verifyOtp({
  email,
  token,
  type: 'email',
})
```
<br/><br/>
## 📦 Supabase Storage

사용자가 이미지를 업로드하면 이미지를 storage에 저장합니다.
정상적으로 저장됐다면 해당 이미지의 경로를 얻을 수 있고, 그 경로를 통해 이미지 주소를 요청할 수 있습니다.

우선 Supabse Storage 사용하기 위해서 Project에서 bucket을 생성합니다.

![image](https://github.com/user-attachments/assets/e8a75ba5-6193-46da-b1a1-6fab756f3ff4)

저장된 이미지를 어플을 이용하는 모든 사람들에게 제공해야 하기 때문에 public으로 설정합니다.
![image](https://github.com/user-attachments/assets/992033b8-388e-4b81-9473-093d12041ef4)



이미지 storage에 저장하는 코드
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
