import { ReactWrapper } from 'enzyme';
import { HTMLAttributes, Component } from 'react';

export type ReactWrapperType = ReactWrapper<
  HTMLAttributes<HTMLElement>,
  any,
  Component<{}, {}, any>
>;
