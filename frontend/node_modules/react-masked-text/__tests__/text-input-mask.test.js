// Link.react.test.js
import React from 'react';
import renderer from 'react-test-renderer';
import TextInputMask from '../src/text-input-mask'

test('TextInputMask renders uncontrolled component', () => {
  const component = renderer.create(
    <TextInputMask kind='cpf' defaultValue='123'/>
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('TextInputMask renders controlled component', () => {
  const component = renderer.create( <TextInputMask kind='cpf' value={''}/>);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();

  component.update( <TextInputMask kind='cpf' value={'123123'}/>);
  const updatedTree = component.toJSON();
  expect(updatedTree).toMatchSnapshot();
});

let outputData = "";
const storeLog = inputs => (outputData += inputs);

test('TextInputMask renders hybrid component (controlled and uncontrolled). This is not recommended and will throw an error on the console.', () => {
  // https://stackoverflow.com/a/45423405/3670829
  console["error"] = jest.fn(storeLog);

  const component = renderer.create( <TextInputMask kind='cpf' value={'123'} defaultValue={''}/>);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
  expect(outputData).toBe("react-masked-text: ERROR - defaultValue and value shouldn't be set at the same time!");
});

test('TextInputMask renders controlled component with initial value', () => {
  const value = '223';
  const onChange = (val) => value = val;
  const component = renderer.create(
    <TextInputMask kind='cpf' onChangeText={onChange} value={value}/>
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});