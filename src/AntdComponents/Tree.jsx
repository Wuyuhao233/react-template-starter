import { Button, Tree } from "antd";
import Search from "antd/lib/input/Search";
import React, { useEffect, useMemo, useState } from "react";
import { getTree } from "../request/axios";

// _level: number, _preKey?: React.Key, _tns?: DataNode[]

export default function TreePage() {
  const [treeData, setTreedata] = useState([]);
  const [searchValue, setSearchValue] = useState();
  const [autoExpandParent, setAutoExpandParent] = useState(true);
  const [expandedKeys, setExpandedKeys] = useState([]);
  const onchange = (e) => {
    const { value } = e.target;
  };
  const onExpand = (newExpandedKeys) => {
    console.log(newExpandedKeys);
    setExpandedKeys(newExpandedKeys);
    setAutoExpandParent(false);
  };
  const onChange = (e) => {
    const { value } = e.target;
    setSearchValue(value);
    console.log(value)
    const loop = (treedata) => {
      return treedata.map((item) => {
        const strTitle = item.title;
        const index = strTitle.indexOf(value);
        const beforeStr = strTitle.substring(0, index);
        const afterStr = strTitle.slice(index + value.length);
        const title =
          index > -1 ? (
            <span>
              {beforeStr}
              <span style={{ color: "red" }}>{value}</span>
              {afterStr}
            </span>
          ) : (
            <span>{item.title}</span>
          );

        if (item.children) {
          return {
            title,
            key: item.key,
            children: loop(item.children),
          };
        }
        return {
          title,
          key: item.key,
        };
      });
      // treedata.map((data)=>{
      //     let subtitle = data.title
      //     let index = subtitle.indexOf(value)
      //     let beforeStr = subtitle.substring(0,index)
      //     let afterStr = subtitle.slice(searchValue?.length + index)
      //     let title = index>-1? (<span>
      //         {beforeStr}
      //         <span style={{color:'red'}}>{searchValue}</span>
      //         {afterStr}
      //     </span>): (<span>{subtitle}</span>)
      //     if(data.children){
      //         return {
      //             title,
      //             key:data.key,
      //             children:loop(data.children)
      //         }
      //     }else{
      //         return {
      //             title,
      //             key:data.key
      //         }
      //     }
      // })
    };
    const tree = loop(treeData);
    setTreedata(tree);
  };
  const getTreeInformation = async () => {
    let res = await getTree();
    if (res.status === 200) {
      setTreedata(res.data);
    }
  };
  useEffect(() => {
    getTreeInformation();
  }, []);
  const rightClick = ({ event, node }) => {
    console.log(event);
    setExpandedKeys([node.key]);
    console.log(node);
  };
  return (
    <div>
        <Button type="primary" onClick={()=>{console.log(treeData)}}>??????tree</Button>
      <Search style={{ marginBottom: "8px" }} placeholder="search" onChange={onChange} />
      {/* onExpand ??????/????????????????????? --	function(expandedKeys, {expanded: bool, node})
           expandedKeys ???????????????????????????????????? --	string[]
           autoExpandParent 	??????????????????????????? -- 	boolean
           treeData treeNodes ????????????????????????????????????????????? TreeNode ?????????key ??????????????????????????????
            -- array<{key, title, children, [disabled, selectable]}>
             ?????? key: '0-0',     ??????  key: '0-0-0',
      */}
      <Tree
        onExpand={onExpand}
        expandedKeys={expandedKeys}
        autoExpandParent={autoExpandParent}
        treeData={treeData}
        onRightClick={rightClick}
      />
    </div>
  );
}
