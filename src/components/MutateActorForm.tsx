import { LockOutlined, MobileOutlined } from '@ant-design/icons';
import { ModalForm, ProFormSelect, ProFormText } from '@ant-design/pro-components';
import { FormattedMessage, useIntl } from '@umijs/max';
import { EMAIL_PATTERN } from '@/utils/constants';
import WILAYAS from '@/data/wilayas';
import { Col, Row } from 'antd';

interface MutateActorFormProps {
  visible: boolean;
  setVisible: (value: boolean) => void;
  handleSubmit: (formData: any) => Promise<boolean | void>;
  isLoading: boolean;
  title: string;
  name?: string;
  initialValues?: any;
  action: 'add' | 'update';
}

function MutateActorForm({
  visible,
  setVisible,
  handleSubmit,
  isLoading,
  title,
  name,
  initialValues,
  action,
}: Readonly<MutateActorFormProps>) {
  const intl = useIntl();
  const t = intl.formatMessage;

  return (
    <ModalForm
      title={title}
      open={visible}
      onOpenChange={setVisible}
      onFinish={handleSubmit}
      loading={isLoading}
      initialValues={initialValues}
    >
      <ProFormText
        rules={[{ required: true, message: 'required!' }]}
        fieldProps={{
          size: 'large',
          maxLength: 30,
        }}
        name="firstName"
        label={t({ id: 'cols.firstName' })}
      />
      <ProFormText
        rules={[{ required: true, message: 'required!' }]}
        fieldProps={{
          size: 'large',
          maxLength: 30,
        }}
        name="lastName"
        label={t({ id: 'cols.lastName' })}
      />
      <ProFormText
        rules={[
          { required: true, message: 'required!' },
          { pattern: EMAIL_PATTERN, message: t({ id: 'cols.email.invalid' }) },
        ]}
        fieldProps={{
          size: 'large',
          maxLength: 30,
        }}
        name="email"
        label={t({ id: 'cols.email' })}
      />
      <Row justify="space-between">
        <Col span={7}>
          <ProFormSelect
            fieldProps={{
              size: 'large',
            }}
            label="Country code"
            placeholder={intl.formatMessage({
              id: 'pages.login.countryCode.placeholder',
              defaultMessage: 'Please select county',
            })}
            options={[
              {
                value: 'DZ',
                label: '🇩🇿 Algeria',
              },
              {
                value: 'MA',
                label: '🇲🇦 Morocco',
              },
            ]}
            rules={[
              {
                required: true,
                message: (
                  <FormattedMessage
                    id="pages.login.countryCode.required"
                    defaultMessage="required!"
                  />
                ),
              },
            ]}
            name="countryCode"
          />
        </Col>
        <Col span={16}>
          <ProFormText
            fieldProps={{
              size: 'large',
              prefix: <MobileOutlined />,
              autoComplete: 'off',
              inputMode: 'tel',
              maxLength: 10,
            }}
            label="Phone Number"
            name="phone"
            rules={[
              {
                required: true,
                message: (
                  <FormattedMessage
                    id="pages.login.phoneNumber.required"
                    defaultMessage="Invalid phone number"
                  />
                ),
              },
              {
                max: 10,
                message: (
                  <FormattedMessage
                    id="pages.login.phoneNumber.invalid"
                    defaultMessage="invalid phone number"
                  />
                ),
              },
              {
                min: 10,
                message: (
                  <FormattedMessage
                    id="pages.login.phoneNumber.invalid"
                    defaultMessage="invalid phone number"
                  />
                ),
              },
            ]}
            validateTrigger="onFinish"
          />
        </Col>
      </Row>
      {action === 'add' && (
        <ProFormText.Password
          name="password"
          label="Password"
          fieldProps={{
            size: 'large',
            prefix: <LockOutlined />,
            autoComplete: 'off',
          }}
          rules={[{ required: true, message: 'required!' }]}
        />
      )}
      {name === 'salesPerson' && (
        <ProFormSelect
          fieldProps={{
            size: 'large',
            mode: 'multiple',
          }}
          label="Zone"
          placeholder={'Zone'}
          options={WILAYAS}
          rules={[
            {
              required: true,
              message: 'required!',
            },
          ]}
          name="zone"
        />
      )}
      {name === 'salesPerson' && (
        <ProFormSelect
          fieldProps={{
            size: 'large',
          }}
          label="Wilaya"
          placeholder={'Wilaya'}
          options={WILAYAS}
          rules={[
            {
              required: true,
              message: 'required!',
            },
          ]}
          name="state"
        />
      )}
    </ModalForm>
  );
}

export default MutateActorForm;
