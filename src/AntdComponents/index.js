import { Button } from "antd";
import React from "react";
import { getTree } from "../request/axios";
import Tree123 from "./exe";
import TreePage from "./Tree";

const getTreeInfor = async() => { 
  let res = await getTree()
  console.log(res)
 }

export default function Page() {
  return (
    <div>
     <Button type="primary" onClick={getTreeInfor}>点击获取tree</Button>
     <TreePage/>
     <Tree123/>
    </div>
  );
}
