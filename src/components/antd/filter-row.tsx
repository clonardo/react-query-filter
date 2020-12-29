import React, { FC } from 'react';
import {
  Tooltip,
  Button,
  Typography,
  Row,
  Col,
  Space,
  Input,
  Select,
  Divider,
} from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import { useRowUtilities } from '../../filterOperations';
import { FilterRowProps } from '../../types';

const { Text } = Typography;
const { Option } = Select;

/**
 * Antd control size, for uniformity
 */
const controlSize = 'small';

/**
 * Antd variant of Filter Row
 */
export const FilterRow: FC<FilterRowProps> = ({
  properties,
  filter,
  isFirst,
  onRemove,
  onChangeBinding,
  onChangeField,
  onChangeOperation,
  onChangeValue,
}) => {
  const {
    getFilterOperationsForType,
    shouldRenderValueInputForOperation,
  } = useRowUtilities();

  return (
    <Row>
      <Col flex="70px">
        <Tooltip title="Remove Filter" placement="left">
          <Button
            type="primary"
            shape="circle"
            style={{
              backgroundColor: '#666',

              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              outline: 'none',
            }}
            icon={<CloseOutlined />}
            size={controlSize}
            onClick={onRemove}
          />
        </Tooltip>
      </Col>
      <Col flex="auto">
        <Space split={<Divider type="vertical" />}>
          {isFirst ? (
            <Text>Where&nbsp;</Text>
          ) : (
            <Select
              size={controlSize}
              style={{ maxWidth: '6rem', minWidth: '110px' }}
              defaultValue={filter.binding}
              onChange={e => {
                onChangeBinding(e);
              }}
            >
              <Option value="and">And</Option>
              <Option value="or">Or</Option>
            </Select>
          )}

          <Select
            size={controlSize}
            style={{ maxWidth: '6rem', minWidth: '110px' }}
            defaultValue={filter.field}
            onChange={onChangeField}
            placeholder="Field"
          >
            {properties.map((prop, index) => (
              <Option value={prop.key} key={index}>
                {prop.label}
              </Option>
            ))}
          </Select>

          <Select
            size={controlSize}
            style={{ maxWidth: '6rem', minWidth: '110px' }}
            defaultValue={filter.operation}
            onChange={onChangeOperation}
            placeholder="Operation"
          >
            {getFilterOperationsForType(filter.type).map((operation, index) => (
              <Option value={operation.value} key={index}>
                {operation.label}
              </Option>
            ))}
          </Select>

          {shouldRenderValueInputForOperation(filter.operation) && (
            <Input
              size={controlSize}
              style={{ minWidth: '150px' }}
              placeholder="Value"
              defaultValue={filter.value ?? ''}
              onChange={onChangeValue}
            />
          )}
        </Space>
      </Col>
    </Row>
  );
};
