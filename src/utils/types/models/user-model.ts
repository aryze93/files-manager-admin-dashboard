export enum CurrentUserRole {
  COMPANY_MANAGER = 'COMPANY_MANAGER',
  COMPANY_SUPERVISOR = 'COMPANY_SUPERVISOR',
}

export type CurrentUser = {
  id: string;
  username: string;
};
