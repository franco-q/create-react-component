import React from "react";
import renderer from "react-test-renderer";

import __tpl__ from "./__tpl__";

describe("<__tpl__ />", () => {
  const defaultProps = {};
  const wrapper = renderer.create(<__tpl__ {...defaultProps} />);

  test("render", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
