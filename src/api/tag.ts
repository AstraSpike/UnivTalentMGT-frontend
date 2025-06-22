import request from '../service/request';

// 标签模型（同人员接口中的Tag）
export interface Tag {
  id: number;
  tagName: string;
  tagType: string;
  createTime: string;
  updateTime: string;
}

// 3.2.1 创建或更新标签
export function createOrUpdateTag(tag: Tag) {
  return request({
    url: '/tags',
    method: 'post',
    data: tag,
  });
}

// 3.2.2 获取所有标签列表
export function fetchTagList() {
  return request({
    url: '/tags',
    method: 'get',
  });
}

// 3.2.3 保存系统生成的标签（批量）
export function saveSystemTags(tags: Omit<Tag, 'id' | 'updateTime'>[]) {
  return request({
    url: '/tags/system',
    method: 'post',
    data: tags,
  });
}

// 3.2.4 保存用户自定义标签
export function saveUserDefinedTag(tag: Omit<Tag, 'id' | 'updateTime'>) {
  return request({
    url: '/tags/user-defined',
    method: 'post',
    data: tag,
  });
}