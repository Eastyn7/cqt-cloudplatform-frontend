<script setup lang="ts">
// 模拟从后端获取的团队成员信息
const teamMembers = ref([
  {
    id: 1,
    name: '向巧',
    role: '指导老师',
    description: '向巧老师的简介',
    photo: 'https://fastly.jsdelivr.net/npm/@vant/assets/ipad.jpeg'
  },
  {
    id: 2,
    name: '张三',
    role: '队长',
    description: '张三的简介',
    photo: 'https://fastly.jsdelivr.net/npm/@vant/assets/ipad.jpeg'
  },
  {
    id: 3,
    name: '李四',
    role: '副队长',
    description: '李四的简介',
    photo: 'https://fastly.jsdelivr.net/npm/@vant/assets/ipad.jpeg'
  }
])

const activeNames = ref<string[]>([]) // 折叠项控制
</script>

<template>
  <div class="about-us-page">
    <!-- 队徽队名部分 -->
    <section class="team-introduction">
      <img src="@/assets/images/duiqi.jpg" alt="队旗" class="team-logo" />
    </section>

    <section class="team-details">
      <!-- 团队发展历史部分 -->
      <section class="team-history">
        <van-divider
          content-position="left"
          :style="{ color: '#1989fa', borderColor: '#1989fa' }"
          >发展历史</van-divider
        >
        <van-collapse v-model="activeNames">
          <van-collapse-item title="2019 年 - 创建初期" name="1">
            <p>
              心之光服务队在 2019
              年由一群热心公益的大学生创建，最初的目标是帮助偏远山区的孩子们提升心理健康意识。团队一开始只有
              5 名成员，专注于举办小型讲座和心理辅导活动。
            </p>
          </van-collapse-item>
          <van-collapse-item title="2020 年 - 扩大规模" name="2">
            <p>
              随着活动影响力的增加，团队在 2020 年迅速扩大，成员人数增长到 20
              人。服务队与多个非营利组织合作，开展了线上心理辅导和线下支教等多项活动。
            </p>
          </van-collapse-item>
          <van-collapse-item title="2021 年 - 技术赋能" name="3">
            <p>
              2021
              年，服务队引入网络平台，利用现代技术为更多儿童提供心理辅导服务。团队开发了心理健康测评小程序，并通过远程辅导方式帮助更多孩子。
            </p>
          </van-collapse-item>
          <van-collapse-item title="2022 年至今 - 成长与创新" name="4">
            <p>
              服务队继续壮大，成员达到了 50
              人，活动覆盖了全国多个省份。特色项目如“心灵绘画”“情绪解压工作坊”等深受孩子们的欢迎。
            </p>
          </van-collapse-item>
        </van-collapse>
      </section>

      <!-- 团队重要成员部分 -->
      <section class="team-members">
        <van-divider
          content-position="left"
          :style="{ color: '#1989fa', borderColor: '#1989fa' }"
          >团队重要成员</van-divider
        >
        <van-card
          v-for="member in teamMembers"
          :key="member.id"
          :title="`${member.role} - ${member.name}`"
          :desc="member.description"
          :thumb="member.photo"
        >
        </van-card>
      </section>

      <!-- 特色活动部分 -->
      <section class="featured-activities">
        <van-divider
          content-position="left"
          :style="{ color: '#1989fa', borderColor: '#1989fa' }"
          >特色活动</van-divider
        >
        <div class="activity-list">
          <div class="activity-item">
            <img
              src="@/assets/images/duiqi.jpg"
              alt="爱心雨伞"
              class="activity-image"
            />
            <h3>爱心雨伞</h3>
            <p>
              通过绘画，孩子们自由表达情感，服务队通过画作分析帮助解决心理问题。
            </p>
          </div>
          <div class="activity-item">
            <img
              src="@/assets/images/duiqi.jpg"
              alt="情绪解压工作坊"
              class="activity-image"
            />
            <h3>向日葵基地</h3>
            <p>
              通过互动游戏和小组讨论，教会孩子们如何调节情绪，释放负面情绪。
            </p>
          </div>
          <div class="activity-item">
            <img
              src="@/assets/images/duiqi.jpg"
              alt="线上心理辅导"
              class="activity-image"
            />
            <h3>一天门社区服务</h3>
            <p>服务队提供一对一线上心理辅导，帮助更多儿童获得专业心理支持。</p>
          </div>
        </div>
      </section>
    </section>
  </div>
</template>

<style scoped>
.team-introduction {
  text-align: center;
  background-color: white;
  padding: 10px;
  border-radius: 20px;
}

.team-logo {
  width: 100%;
  border-radius: 20px;
}

.team-details {
  padding: 0 20px;
}

.activity-list {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
}

.activity-item {
  width: 300px;
}

.activity-image {
  width: 100%;
  border-radius: 20px;
}
</style>
