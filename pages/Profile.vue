<script setup lang="ts">
import type { ProfilesDatabase } from '@/types'
import { useProfileStore } from '@/store'
import { storeToRefs } from 'pinia'

const supabase = useSupabaseClient<ProfilesDatabase>()
const { isLogin, isApiLoading, userProfile } = storeToRefs(useProfileStore())

const isEditing = ref(false)
const formData = ref({
  name: '',
  introduce: '',
  from: '',
  sex: '',
})

// 當進入編輯模式時，將當前資料填入表單
watch(isEditing, (newValue) => {
  if (newValue && userProfile.value) {
    formData.value = {
      name: userProfile.value.name,
      introduce: userProfile.value.introduce ?? '',
      from: userProfile.value.from ?? '',
      sex: userProfile.value.sex ?? '',
    }
  }
})

async function updateUserProfile() {
  if (!userProfile.value?.id) {
    return
  }

  const { data, error } = await supabase
    .from('profiles')
    .update(formData.value)
    .eq('id', userProfile.value.id)
    .select()
    .single()
  console.log(data)
  if (error) {
    console.error('更新失敗:', error)
    return
  }

  // 更新成功後更新本地狀態
  userProfile.value = data
  isEditing.value = false
}
</script>

<template>
  <div class="profile-container">
    <div v-if="isApiLoading" class="loading">
      載入中...
    </div>
    <div v-else-if="!isLogin" class="not-login">
      請先登入
    </div>
    <div v-else class="profile-content">
      <!-- 顯示模式 -->
      <div v-if="!isEditing" class="profile-view">
        <div class="avatar">
          <img :src="userProfile?.avatar ?? ''" alt="頭像">
        </div>
        <div class="info">
          <h2>{{ userProfile?.name }}</h2>
          <p v-if="userProfile?.introduce">
            {{ userProfile.introduce }}
          </p>
          <p v-if="userProfile?.from">
            來自: {{ userProfile.from }}
          </p>
          <p v-if="userProfile?.sex">
            性別: {{ userProfile.sex }}
          </p>
        </div>
        <button class="edit-btn" @click="isEditing = true">
          編輯資料
        </button>
      </div>

      <!-- 編輯模式 -->
      <div v-else class="profile-edit">
        <form class="edit-form" @submit.prevent="updateUserProfile">
          <div class="form-group">
            <label for="name">名字</label>
            <input id="name" v-model="formData.name" type="text" required>
          </div>

          <div class="form-group">
            <label for="introduce">自我介紹</label>
            <textarea id="introduce" v-model="formData.introduce" rows="3"></textarea>
          </div>

          <div class="form-group">
            <label for="from">來自</label>
            <select id="from" v-model="formData.from">
              <option value="">
                請選擇
              </option>
              <option value="japan">
                Japan
              </option>
              <option value="taiwan">
                Taiwan
              </option>
            </select>
          </div>

          <div class="form-group">
            <label for="sex">性別</label>
            <select id="sex" v-model="formData.sex">
              <option value="">
                請選擇
              </option>
              <option value="male">
                男
              </option>
              <option value="female">
                女
              </option>
            </select>
          </div>

          <div class="form-actions">
            <button type="submit" class="save-btn">
              儲存
            </button>
            <button type="button" class="cancel-btn" @click="isEditing = false">
              取消
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.profile-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.loading, .not-login {
  text-align: center;
  padding: 20px;
}

.profile-content {
  background: #fff;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.profile-view {
  .avatar {
    text-align: center;
    margin-bottom: 20px;

    img {
      width: 150px;
      height: 150px;
      border-radius: 50%;
      object-fit: cover;
    }
  }

  .info {
    text-align: center;
    margin-bottom: 20px;

    h2 {
      margin-bottom: 10px;
    }

    p {
      margin: 5px 0;
      color: #666;
    }
  }
}

.edit-btn, .save-btn, .cancel-btn {
  padding: 8px 16px;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s;

  &:hover {
    opacity: 0.9;
  }
}

.edit-btn {
  background-color: #4CAF50;
  color: white;
}

.save-btn {
  background-color: #4CAF50;
  color: white;
  margin-right: 10px;
}

.cancel-btn {
  background-color: #f44336;
  color: white;
}

.edit-form {
  .form-group {
    margin-bottom: 15px;

    label {
      display: block;
      margin-bottom: 5px;
      color: #333;
    }

    input, textarea, select {
      width: 100%;
      padding: 8px;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 14px;

      &:focus {
        outline: none;
        border-color: #4CAF50;
      }
    }
  }

  .form-actions {
    margin-top: 20px;
    text-align: right;
  }
}
</style>
