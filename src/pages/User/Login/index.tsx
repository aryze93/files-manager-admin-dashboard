import { useSignInMutation } from "@/services/api";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { LoginForm, ProFormText } from "@ant-design/pro-components";
import { useEmotionCss } from "@ant-design/use-emotion-css";
import { FormattedMessage, SelectLang, useIntl, useModel } from "@umijs/max";
import { message } from "antd";
import { useForm } from "antd/es/form/Form";
import React from "react";

const Lang = () => {
  const langClassName = useEmotionCss(({ token }) => {
    return {
      width: 42,
      height: 42,
      lineHeight: "42px",
      position: "fixed",
      right: 16,
      borderRadius: token.borderRadius,
      ":hover": {
        backgroundColor: token.colorBgTextHover,
      },
    };
  });

  return (
    <div className={langClassName} data-lang>
      {SelectLang && <SelectLang />}
    </div>
  );
};

const Login: React.FC = () => {
  const [signIn, { isLoading }] = useSignInMutation();

  const containerClassName = useEmotionCss(() => {
    return {
      display: "flex",
      flexDirection: "column",
      height: "100vh",
      overflow: "auto",
      backgroundImage:
        "url('https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/V-_oS6r-i7wAAAAAAAAAAAAAFl94AQBr')",
      backgroundSize: "100% 100%",
    };
  });

  const intl = useIntl();
  const t = intl.formatMessage;
  const [form] = useForm();

  const handleSubmit = async (values: any) => {
    signIn({
      username: values.username,
      password: values.password,
    })
      .unwrap()
      .catch((error) => {
        console.log("Error login in:", error);
        const defaultLoginFailureMessage = t({
          id: "pages.login.failure",
          defaultMessage: "failed login",
        });
        message.error(defaultLoginFailureMessage);
      });
  };

  return (
    <div className={containerClassName}>
      <Lang />
      <div
        style={{
          flex: "1",
          padding: "100px 0",
        }}
      >
        <LoginForm
          form={form}
          contentStyle={{
            minWidth: 280,
            maxWidth: "75vw",
          }}
          style={{ marginTop: 40 }}
          logo={<img alt="logo" src="/logo.svg" />}
          title="Local Files manager"
          onFinish={async (values) => {
            await handleSubmit(values);
          }}
          loading={isLoading}
        >
          <div style={{ marginTop: 20 }}>
            <ProFormText
              fieldProps={{
                size: "large",
                prefix: <UserOutlined />,
              }}
              name="username"
              placeholder={intl.formatMessage({
                id: "pages.login.username.placeholder",
                defaultMessage: "Username",
              })}
              rules={[
                {
                  required: true,
                  message: (
                    <FormattedMessage
                      id="pages.login.username.required"
                      defaultMessage="required!"
                    />
                  ),
                },
              ]}
            />
            <ProFormText.Password
              name="password"
              fieldProps={{
                size: "large",
                prefix: <LockOutlined />,
              }}
              placeholder={t({
                id: "pages.login.password.placeholder",
                defaultMessage: "password",
              })}
              rules={[
                {
                  required: true,
                  message: (
                    <FormattedMessage
                      id="pages.login.password.required"
                      defaultMessage="Requered!"
                    />
                  ),
                },
              ]}
            />
          </div>
        </LoginForm>
      </div>
    </div>
  );
};

export default Login;
