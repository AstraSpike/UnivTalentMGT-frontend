import request from '../service/request';

// 3.3.1 简单方式记录会议日志
export function logMeetingSimple(operation: string) {
  return request({
    url: '/meetings/log',
    method: 'post',
    data: operation, // 文档示例："创建会议"
  });
}

// 3.3.2 获取所有会议操作日志
export interface MeetingLog {
  id: number;
  userId: number;
  operationType: string;
  operationTime: string;
}

export function fetchMeetingLogs() {
  return request({
    url: '/meetings/logs',
    method: 'get',
  });
}

// 3.3.3 完整方式记录会议日志
export function logMeetingComplete(log: Omit<MeetingLog, 'id'>) {
  return request({
    url: '/meetings/logs/record',
    method: 'post',
    data: log,
  });
}