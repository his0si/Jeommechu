// 랜덤한 메뉴를 선택하는 함수
function getRandomMenu() {
  // getMenuList() 함수를 통해 메뉴 목록을 가져옴
  const menuList = getMenuList();

  // 랜덤하게 2~3개의 메뉴 선택
  const numChoices = Math.floor(Math.random() * 2) + 2; // 2 또는 3 중 랜덤하게 선택
  const selectedMenus = []; // 선택된 메뉴들을 저장할 배열
  const usedIndices = []; // 이미 선택된 메뉴의 인덱스를 저장하는 배열

  // 선택된 메뉴 개수가 numChoices와 같아질 때까지 반복
  while (selectedMenus.length < numChoices) {
      const randomIndex = Math.floor(Math.random() * menuList.length); // 랜덤한 인덱스 선택
      if (!usedIndices.includes(randomIndex)) { // 이미 선택되지 않은 경우
          selectedMenus.push(menuList[randomIndex]); // 해당 메뉴를 선택 목록에 추가
          usedIndices.push(randomIndex); // 인덱스를 중복 선택하지 않도록 추가
      }
  }

  // 선택된 메뉴를 HTML 요소에 표시
  const resultElement = document.getElementById("result");
  resultElement.textContent = selectedMenus.join(", ");

  const menuContainer = document.getElementById("result");
  menuContainer.innerHTML = ""; // 메뉴 컨테이너 초기화

  // 선택된 메뉴들을 div 요소로 생성하여 화면에 표시
  for (const menu of selectedMenus) {
      const menuElement = document.createElement("div");
      menuElement.textContent = menu;
      menuElement.classList.add("result"); // CSS 스타일 클래스 추가
      menuElement.addEventListener("click", () => voteForMenu(menu)); // 메뉴를 클릭하면 투표 기능 호출
      menuContainer.appendChild(menuElement);
  }
}

// 메뉴 투표 결과를 저장하는 객체
const votedMenus = {};

// 특정 메뉴에 대한 투표를 처리하는 함수
function voteForMenu(menu) {
  storeVoteResult(menu); // 투표 결과 저장
  alert(`${menu} 투표가 완료되었습니다!`); // 투표 완료 메시지 표시
}

// 투표 결과를 로컬 스토리지에 저장하는 함수
function storeVoteResult(menu) {
  if (!localStorage.votedMenus) {
      localStorage.votedMenus = JSON.stringify({});
  }

  const votedMenus = JSON.parse(localStorage.votedMenus);

  if (!votedMenus[menu]) {
      votedMenus[menu] = 1; // 해당 메뉴가 처음 투표된 경우 1로 초기화
  } else {
      votedMenus[menu]++; // 이미 투표된 경우 횟수 증가
  }

  localStorage.votedMenus = JSON.stringify(votedMenus); // 업데이트된 결과를 로컬 스토리지에 저장
}

// 상위 메뉴 투표 결과를 가져오는 함수
function getTopMenuResults(num) {
  const votedMenus = JSON.parse(localStorage.votedMenus || "{}");
  const sortedMenus = Object.keys(votedMenus).sort((a, b) => votedMenus[b] - votedMenus[a]);
  return sortedMenus.slice(0, num);
}

// 상위 3개 메뉴의 투표 결과 가져와서 콘솔에 출력
const top3Menus = getTopMenuResults(3);
console.log("1st: " + top3Menus[0]);
console.log("2nd: " + top3Menus[1]);
console.log("3rd: " + top3Menus[2]);

// 매주 월요일마다 투표 결과 초기화를 위한 클라이언트 측 스케줄링
//웹 페이지를 방문하는 사용자의 브라우저에서 스케줄링을 처리하는 방법

// 투표 결과 초기화 함수
function resetVoteResults() {
  // 로컬 스토리지의 투표 결과 데이터를 초기화
  localStorage.votedMenus = JSON.stringify({});
  console.log("투표 결과가 초기화되었습니다!");
}

// 매주 월요일의 날짜와 시간 설정 (예시: 월요일 00:00:00)
const resetDayOfWeek = 1; // 월요일
const resetHour = 0; // 0시
const resetMinute = 0; // 0분
const resetSecond = 0; // 0초

// 클라이언트 측 스케줄링을 위한 함수
function scheduleReset() {
  const now = new Date();
  const timeUntilReset = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() + (resetDayOfWeek + 6 - now.getDay()) % 7,
      resetHour,
      resetMinute,
      resetSecond
  ) - now;

  setTimeout(() => {
      resetVoteResults(); // 투표 결과 초기화 함수 실행
      scheduleReset(); // 다음 주기적인 작업 스케줄링
  }, timeUntilReset);
}

// 초기 스케줄링 실행
scheduleReset();