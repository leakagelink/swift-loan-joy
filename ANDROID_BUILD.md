# Android build guide (PowerShell + Android Studio)

App: **Business Standard Loan** · Package: `com.businessstandard.loan`

Ye app TanStack Start (SSR) hai, isliye native shell Capacitor ke through deployed web app
(`https://swift-loan-joy.lovable.app`) ko load karta hai. Lovable me changes publish karte hi
app me bhi live ho jate hain — dobara APK banane ki zarurat nahi.

## 1. Ek baar ka setup (Windows)

- Node.js 20+ : https://nodejs.org
- Android Studio (Ladybug+) : https://developer.android.com/studio
  - SDK Manager → **Android SDK Platform 35** + **Android SDK Build-Tools** + **Platform-Tools** install karein
- JDK 21 (Android Studio ke saath aata hai)

PowerShell me (ek baar):

```powershell
[Environment]::SetEnvironmentVariable("ANDROID_HOME", "$env:LOCALAPPDATA\Android\Sdk", "User")
[Environment]::SetEnvironmentVariable("JAVA_HOME", "C:\Program Files\Android\Android Studio\jbr", "User")
```

PowerShell window band karke naya kholein.

## 2. Project clone karein

```powershell
cd $HOME\Documents
git clone https://github.com/leakagelink/swift-loan-joy.git
cd swift-loan-joy
npm install
```

> Lovable me kiye gaye naye changes lene ke liye baad me sirf: `git pull; npm install`

## 3. Android platform add karein

```powershell
npm run build
npx cap add android
npx cap sync android
```

`android/` folder ban jayega (ye repo me commit nahi hota — normal hai).

## 4. Android Studio me kholein

```powershell
npx cap open android
```

Gradle sync complete hone ka wait karein → upar device/emulator select karein → **Run ▶**.

## 5. APK / AAB banayein

Debug APK (testing ke liye):

```powershell
cd android
.\gradlew.bat assembleDebug
cd ..
```

Output: `android\app\build\outputs\apk\debug\app-debug.apk`

Play Store ke liye release AAB (Android Studio → **Build → Generate Signed App Bundle / APK**,
keystore banayein aur usse hamesha safe rakhein).

## 6. Web changes ke baad

```powershell
git pull
npm install
npm run build
npx cap sync android
```

## Troubleshooting

| Problem | Fix |
| --- | --- |
| `gradlew.bat` not recognized | `cd android` karke chalayein, ya `.\gradlew.bat` |
| SDK location not found | `ANDROID_HOME` set karein (Step 1) ya `android\local.properties` me `sdk.dir=C\:\\Users\\<you>\\AppData\\Local\\Android\\Sdk` |
| White screen app me | Internet check karein; `capacitor.config.ts` ka `server.url` valid hona chahiye |
| JAVA_HOME error | JDK 21 path set karein (Step 1) |
| Gradle download slow | Pehli baar 5-10 min lagta hai, wait karein |

## Fully offline app chahiye?

Tab `capacitor.config.ts` se `server` block hata dena hoga aur app ko static build karna hoga —
bolein to main SSR-free static variant set kar deta hoon.
