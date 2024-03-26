import { AvatarDropdown, AvatarName, SelectLang } from "@/components";
import type { Settings as LayoutSettings } from "@ant-design/pro-components";
import type { RunTimeLayoutConfig } from "@umijs/max";
import { history } from "@umijs/max";
import defaultSettings from "../config/defaultSettings";
import { BASE_URL } from "./config";
import { CurrentUser } from "@/utils/types/models/user-model";
const loginPath = "/user/login";

/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
export async function getInitialState(): Promise<{
  settings?: Partial<LayoutSettings>;
  currentUser?: CurrentUser | null;
  loading?: boolean;
  fetchUserInfo?: () => Promise<CurrentUser | undefined>;
}> {

  const fetchUserInfo = async () => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      history.replace(loginPath);
    }
    try {
      const response = await fetch(`${BASE_URL}users/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        if (history.location.pathname === loginPath) {
          history.replace('/');
        }
        history.replace(history.location.pathname);
        const data = await response.json();
        return data;
      }
      if (response.status === 401) {
        console.log("🚀 ~ file: app.tsx:38 ~ fetchUserInfo ~ error:");
        history.replace(loginPath);
        return;
      }
    } catch (error) {
      console.log("🚀 ~ file: app.tsx:38 ~ fetchUserInfo ~ error:", error);
      history.replace(loginPath);
    }
    return;
  };

  const currentUser = await fetchUserInfo();
  if (currentUser) {
    return {
      fetchUserInfo,
      currentUser,
      settings: defaultSettings as Partial<LayoutSettings>,
    };
  }
  return {
    currentUser: null,
    settings: defaultSettings as Partial<LayoutSettings>,
  };
}
const avatar =
  "https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png";
// ProLayout https://procomponents.ant.design/components/layout
const CustomLayout: RunTimeLayoutConfig = ({
  initialState,
  setInitialState,
}) => {
  return {
    actionsRender: () => [<SelectLang key="SelectLang" />],
    avatarProps: {
      src: avatar,
      title: <AvatarName />,
      render: (_, avatarChildren) => {
        return <AvatarDropdown>{avatarChildren}</AvatarDropdown>;
      },
    },
    onPageChange: () => {
      if (!initialState?.currentUser && location.pathname !== loginPath) {
        history.replace(loginPath);
      }
    },
    layoutBgImgList: [
      {
        src: "https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/D2LWSqNny4sAAAAAAAAAAAAAFl94AQBr",
        left: 85,
        bottom: 100,
        height: "303px",
      },
      {
        src: "https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/C2TWRpJpiC0AAAAAAAAAAAAAFl94AQBr",
        bottom: -68,
        right: -45,
        height: "303px",
      },
      {
        src: "https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/F6vSTbj8KpYAAAAAAAAAAAAAFl94AQBr",
        bottom: 0,
        left: 0,
        width: "331px",
      },
    ],
    links: [],
    menuHeaderRender: undefined,
    childrenRender: (children) => {
      return (
        <>
          {children}
        </>
      );
    },
    ...initialState?.settings,
  };
};
export const layout: RunTimeLayoutConfig = (initData) => {
  return CustomLayout(initData);
};
