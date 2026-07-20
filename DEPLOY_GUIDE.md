# DevToolbox 배포 & 검색엔진 등록 가이드

사이트를 GitHub Pages에 올리고, 구글·네이버 검색에 노출시키고, 애드센스를 준비하는 전 과정을 순서대로 정리한 문서입니다.
위에서부터 차례대로 진행하면 됩니다. ✅ 표시는 이미 완료된 단계입니다.

- 저장소: https://github.com/moraenymph-oss/devtoolbox
- 사이트 주소: https://moraenymph-oss.github.io/devtoolbox/

---

## 1단계. GitHub 저장소 만들기 ✅ (완료)

> 이미 완료된 단계지만, 다른 사이트를 새로 만들 때를 대비해 기록해 둡니다.

1. https://github.com 로그인 → 오른쪽 위 **+** → **New repository**
2. Repository name: `devtoolbox` 입력 (이 이름이 사이트 주소의 뒷부분이 됩니다)
3. **Public** 선택 (GitHub Pages 무료 사용은 Public 저장소만 가능)
4. README 등 초기 파일은 만들지 않고 **Create repository** 클릭

로컬 폴더를 저장소에 올리기 (터미널에서):

```bash
cd d:\ai_portal_demo\devtoolbox
git init -b main
git add -A
git commit -m "첫 커밋"
git remote add origin https://github.com/moraenymph-oss/devtoolbox.git
git push -u origin main
```

---

## 2단계. GitHub Pages 활성화 ✅ (완료)

1. 저장소 페이지 → **Settings** 탭 클릭
2. 왼쪽 메뉴 아래쪽 **Pages** 클릭
3. **Build and deployment** 섹션에서:
   - **Source**: `Deploy from a branch`
   - **Branch**: `main` / 폴더 `/ (root)` 선택 → **Save**
4. 1~10분 뒤 상단에 초록색으로 **"Your site is live at https://moraenymph-oss.github.io/devtoolbox/"** 가 뜨면 완료

### ⚠️ 404가 나올 때 (실제로 겪은 문제)

- Pages를 켠 직후에는 첫 배포가 끝날 때까지 404가 정상입니다. 10분 정도 기다려 보세요.
- 10분이 지나도 404라면: 저장소의 **Actions** 탭에서 "pages build and deployment" 워크플로를 확인하세요.
  - `startup_failure`(빨간 X)로 실패해 있으면 → **아무 커밋이나 새로 푸시**하면 빌드가 다시 돌면서 대부분 해결됩니다.
  - 이 저장소도 첫 두 번의 빌드가 실패했고, `.nojekyll` 파일을 추가한 커밋을 푸시하자 정상 배포되었습니다.
- `.nojekyll` 파일(내용 없는 빈 파일)은 GitHub의 Jekyll 처리를 건너뛰게 해 주는 파일로, 순수 정적 사이트라면 넣어두는 것이 안전합니다. (이미 넣어둠 ✅)

### 이후 사이트 수정 방법

파일을 수정한 뒤 아래 명령만 실행하면 1~2분 안에 자동으로 재배포됩니다.

```bash
git add -A
git commit -m "수정 내용 요약"
git push
```

---

## 3단계. 사이트 동작 확인

배포 후 아래 항목을 한 번씩 눌러보며 확인하세요.

- [ ] 홈: https://moraenymph-oss.github.io/devtoolbox/ 접속, 도구 카드 10개 표시
- [ ] 오른쪽 위 🌙 버튼으로 다크모드 전환, 새로고침해도 유지되는지
- [ ] 휴대폰에서 접속해 레이아웃이 깨지지 않는지
- [ ] 도구 2~3개 실제 사용 (JSON 정렬, Base64 인코딩 등)
- [ ] https://moraenymph-oss.github.io/devtoolbox/sitemap.xml 이 열리는지

---

## 4단계. 구글 서치 콘솔 등록

구글 검색에 사이트가 노출되도록 등록하는 단계입니다.

1. https://search.google.com/search-console 접속 → 구글 계정 로그인
2. 왼쪽 위 **속성 추가** 클릭 → 두 가지 방식 중 **오른쪽 "URL 접두어"** 선택
3. `https://moraenymph-oss.github.io/devtoolbox/` 입력 → **계속**
4. 소유권 확인 화면에서 **"HTML 태그"** 방법 선택
5. 아래처럼 생긴 메타 태그를 복사:
   ```html
   <meta name="google-site-verification" content="여기에긴문자열" />
   ```
6. `index.html` 파일을 열어 `<head>` 안(예: `<meta name="description" ...>` 바로 아래)에 붙여넣기
7. 커밋 & 푸시:
   ```bash
   git add index.html
   git commit -m "구글 서치 콘솔 소유 확인 태그 추가"
   git push
   ```
8. 1~2분 뒤 배포가 반영되면 서치 콘솔 화면으로 돌아와 **확인** 버튼 클릭 → "소유권이 확인됨" 이 뜨면 성공
9. **사이트맵 제출**: 왼쪽 메뉴 **Sitemaps** → 사이트맵 URL 입력칸에 `sitemap.xml` 입력 → **제출**
10. **색인 요청(선택, 권장)**: 상단 검색창(URL 검사)에 홈 주소를 붙여넣고 → **색인 생성 요청** 클릭. 주요 도구 페이지 몇 개도 같은 방법으로 요청하면 노출이 빨라집니다.

> 참고: 등록 후 실제 검색 노출까지는 보통 며칠~몇 주 걸립니다. "실적" 메뉴에 데이터가 쌓이기 시작하면 정상입니다.

---

## 5단계. 네이버 서치 어드바이저 등록

> ⚠️ 네이버는 경로가 붙은 URL(`.../devtoolbox/`)을 받지 않고 **호스트 단위**로만 등록됩니다.
> 이를 위해 루트 주소용 저장소 `moraenymph-oss.github.io` 를 별도로 만들어 두었습니다
> (로컬: `d:\ai_portal_demo\moraenymph-oss.github.io`, 루트 접속 시 DevToolbox로 자동 이동).

1. https://searchadvisor.naver.com 접속 → 네이버 로그인 → 상단 **웹마스터 도구** 클릭
2. 사이트 등록 입력칸에 **`https://moraenymph-oss.github.io`** 입력 (경로 없이 호스트만) → 등록
3. 소유 확인 방식 중 **"HTML 파일 업로드"** 선택 → `naver********.html` 파일 다운로드
4. 그 파일을 **루트 저장소**(`d:\ai_portal_demo\moraenymph-oss.github.io`)에 복사 후 커밋 & 푸시:
   ```bash
   cd d:\ai_portal_demo\moraenymph-oss.github.io
   cp %USERPROFILE%\Downloads\naver********.html .
   git add -A && git commit -m "네이버 소유 확인 파일 추가" && git push
   ```
5. 1~2분 뒤 `https://moraenymph-oss.github.io/naver********.html` 이 열리는지 확인
6. 서치 어드바이저에서 **소유확인** 클릭
7. **사이트맵 제출**: 등록된 사이트 클릭 → 왼쪽 메뉴 **요청 > 사이트맵 제출** → `https://moraenymph-oss.github.io/devtoolbox/sitemap.xml` 입력 → 확인 (호스트로 등록해도 하위 경로 사이트맵 제출 가능)
8. **수집 요청(선택, 권장)**: **요청 > 웹 페이지 수집**에서 홈과 주요 도구 페이지 URL을 하나씩 넣어 수집 요청

---

## 6단계. 구글 애드센스 신청 (준비되면)

승인 심사에는 콘텐츠 분량과 필수 페이지가 중요합니다. 이 사이트는 다음이 이미 준비되어 있습니다:

- ✅ 페이지별 300자 이상의 설명 콘텐츠 (사용법 + 활용 상황)
- ✅ 개인정보처리방침 페이지 (`privacy.html`, 광고·쿠키 조항 포함)
- ✅ 소개 페이지 (`about.html`)
- ✅ 광고가 들어갈 자리 (`<div class="ad-slot">`, 모든 페이지에 배치)

신청 절차:

1. https://adsense.google.com 접속 → 사이트 추가 → `moraenymph-oss.github.io` 입력
   - ⚠️ `github.io` 하위 경로 사이트는 애드센스 등록이 제한될 수 있습니다. 심사가 거부되면 **개인 도메인 구매 + GitHub Pages 커스텀 도메인 연결**을 검토하세요 (Settings > Pages > Custom domain).
2. 애드센스가 주는 확인용 `<script>` 코드를 **모든 페이지의 `<head>`** 에 추가 후 푸시
3. 심사 통과 후, 광고 단위 코드를 발급받아 각 페이지의 `<div class="ad-slot">...</div>` 내용을 광고 코드로 교체
4. `ads.txt` 파일을 만들라고 안내받으면 저장소 루트에 `ads.txt` 파일로 추가 후 푸시

---

## 요약 체크리스트

- [x] GitHub 저장소 생성 및 푸시
- [x] GitHub Pages 활성화 (main / root)
- [x] 배포 확인 (https://moraenymph-oss.github.io/devtoolbox/ 접속됨)
- [ ] 사이트 동작 점검 (3단계)
- [ ] 구글 서치 콘솔: 소유 확인 → 사이트맵 제출 → 색인 요청
- [x] 네이버 서치 어드바이저: 소유 확인 → 사이트맵 제출 → 수집 요청
- [ ] (준비되면) 애드센스 신청

> 💡 소유 확인 메타 태그를 index.html에 넣는 작업은 태그만 전달해 주면 Claude가 대신 처리할 수 있습니다.
