/* eslint-disable @typescript-eslint/no-explicit-any */
export default class ApiResponse<T> {
  status: number;
  message: string;
  data?: T;
  error?: string;
  action?: ApiAction;

  constructor(
    status: number,
    message: string,
    data?: T,
    error?: string,
    action?: ApiAction,
  ) {
    this.status = status;
    this.message = message;
    this.data = data;
    this.error = error;
    this.action = action;
  }
}

export interface ApiAction {
  type: 'SHOW_NOTIFICATION' | 'REDIRECT';
  payload?: Record<string, any>;
}
