import React from "react";
import { Menu } from "antd";
import {
  MailOutlined,
  AppstoreOutlined,
  SettingOutlined,
} from "@ant-design/icons";
export default function Navbar() {
  return (
    <div>
      <Menu mode="horizontal" defaultSelectedKeys={["mail"]}>
        <Menu.Item key="mail" icon={<MailOutlined />}>
          Navigation One
        </Menu.Item>
      </Menu>
    </div>
  );
}
