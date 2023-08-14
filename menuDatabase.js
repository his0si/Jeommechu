
// 메뉴 리스트를 반환하는 함수
function getMenuList() {
  const menuList = [
      "짜장면",
      "짬뽕",
      "라떼",
      "콜라",
      "사이다",
      "밀크티",
      // ... 추가적인 메뉴들을 넣을 수 있습니다.
  ];
  return menuList;
}
// getMenuList 함수 호출하여 메뉴 리스트 가져오기
const menuList = getMenuList();

// 가져온 메뉴 리스트를 HTML에 추가하기
const menuListElement = document.getElementById("menuList");

menuList.forEach(menu => {
  const listItem = document.createElement("li");
  listItem.textContent = menu;
  menuListElement.appendChild(listItem);
});
