/*
 * @Author: Lee
 * @Date: 2021-12-23 14:47:29
 * @LastEditors: Lee
 * @LastEditTime: 2021-12-23 14:49:27
 */
import React, { FC } from 'react';
import { Tree } from 'antd';
import { DataNode } from 'rc-tree/lib/interface';

interface IProps {
  treeData: DataNode[];
  value?: string[];
  onChange?: (value: string[]) => void;
}
const AccessTree: FC<IProps> = (props) => {
  // 获取父节点
  const getParentsKeys = (
    tree: DataNode[],
    func: (data: DataNode) => boolean,
    path: string[] = [],
  ): string[] => {
    if (!tree) return [];
    for (const data of tree) {
      // 记录当前code
      path.push(data.key as string);
      // 判断当前code是否匹配
      if (func(data)) return path;
      // 判断当前对象是否存在children，如果存在，则递归遍历
      if (data.children) {
        const chs = getParentsKeys(data.children, func, path);
        if (chs.length) return chs;
      }
      // 如果此前都没执行return语句，则将记录的当前code移除
      path.pop();
    }
    return [];
  };
  // 获取子节点
  const getChildrenKeys = (tree: DataNode[], path: string[] = []) => {
    if (!tree) {
      return [];
    }
    tree.map((item) => {
      if (item.children) {
        path.push(item.key as string);
        getChildrenKeys(item.children, path);
      } else {
        path.push(item.key as string);
      }
    });
    return path;
  };
  // render
  return (
    <Tree
      checkable
      treeData={props.treeData}
      checkedKeys={props.value}
      checkStrictly={true}
      onCheck={(obj: any, e: any) => {
        const curKey = e.node.key;
        // 选中
        if (e.checked) {
          const checkedKeys = obj.checked;
          const res = getParentsKeys(
            props.treeData,
            (data: any) => data.key === curKey,
          );
          props.onChange &&
            props.onChange([...new Set([...checkedKeys, ...res])]);
        } else {
          // 取消选中
          const chs = [curKey, ...getChildrenKeys(e.node.children)];
          const res = props.value
            ? props.value.filter((item: string) => chs.indexOf(item) == -1)
            : [];
          props.onChange && props.onChange([...res]);
        }
      }}
    />
  );
};

export default AccessTree;
