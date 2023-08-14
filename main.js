function getRandomMenu() {
    const menuList = getMenuList();
  
    // 랜덤하게 2~3개의 메뉴 선택
    const numChoices = Math.floor(Math.random() * 2) + 2;
    const selectedMenus = [];
    const usedIndices = [];
  
    while (selectedMenus.length < numChoices) {
        const randomIndex = Math.floor(Math.random() * menuList.length);
        if (!usedIndices.includes(randomIndex)) {
            selectedMenus.push(menuList[randomIndex]);
            usedIndices.push(randomIndex);
        }
    }
  
  
    const resultElement = document.getElementById("result");
    resultElement.textContent = selectedMenus.join(", ");
  
  
    const menuContainer = document.getElementById("result");
    menuContainer.innerHTML = ""; //
  
    for (const menu of selectedMenus) {
        const menuElement = document.createElement("div");
        menuElement.textContent = menu;
        menuElement.classList.add("result");
        menuElement.addEventListener("click", () => voteForMenu(menu));
        menuContainer.appendChild(menuElement);
    }
   
  }
  
  const votedMenus = {};
  
  function voteForMenu(menu) {
    storeVoteResult(menu);
    alert(`${menu} 투표가 완료되었습니다!`);
  }
  
  function storeVoteResult(menu) {
    if (!localStorage.votedMenus) {
        localStorage.votedMenus = JSON.stringify({});
    }
  
    const votedMenus = JSON.parse(localStorage.votedMenus);
  
    if (!votedMenus[menu]) {
        votedMenus[menu] = 1;
    } else {
        votedMenus[menu]++;
    }
  
    localStorage.votedMenus = JSON.stringify(votedMenus);
  }
  
  function getTopMenuResults(num) {
    const votedMenus = JSON.parse(localStorage.votedMenus || "{}");
    const sortedMenus = Object.keys(votedMenus).sort((a, b) => votedMenus[b] - votedMenus[a]);
    return sortedMenus.slice(0, num);
  }
  
  const top3Menus = getTopMenuResults(3);
  console.log("1st: " + top3Menus[0]);
  console.log("2nd: " + top3Menus[1]);
  console.log("3rd: " + top3Menus[2]);
