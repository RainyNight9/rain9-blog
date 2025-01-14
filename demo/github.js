async function fetchGitHubData(username, type) {
  let allData = [];
  let page = 1;

  while (true) {
    const response = await fetch(
      `https://api.github.com/users/${username}/${type}?per_page=100&page=${page}`
    );
    if (!response.ok) {
      throw new Error(
        `Failed to fetch ${type} (page ${page}): ${response.statusText}`
      );
    }
    const data = await response.json();

    if (data.length === 0) {
      break; // 无更多数据时停止
    }

    allData = allData.concat(data.map((user) => user.login)); // 提取并合并用户名
    page++;
  }

  return allData;
}

async function compareFollowersAndFollowing(username) {
  try {
    // 获取所有 followers 和 following 列表
    const followers = await fetchGitHubData(username, "followers");
    const following = await fetchGitHubData(username, "following");

    // 找出差集
    const notFollowingBack = following.filter(
      (user) => !followers.includes(user)
    ); // 我关注但没关注我
    const notFollowedBy = followers.filter((user) => !following.includes(user)); // 关注我但我没关注

    return {
      followers,
      following,
      notFollowingBack,
      notFollowedBy,
    };
  } catch (error) {
    console.error("Error comparing followers and following:", error);
  }
}

compareFollowersAndFollowing("RainyNight9").then((result) => {
  console.log("followers:", result.followers.length);
  console.log("following:", result.following.length);
  console.log(
    "People you follow but don't follow back:",
    result.notFollowingBack
  );
  console.log(
    "People who follow you but you don't follow back:",
    result.notFollowedBy
  );
});
