import React from "react";
import { addDecorator, addParameters } from "@storybook/react"
import { ChakraProvider } from "@chakra-ui/react";
import "antd/dist/antd.css";

addParameters({
  actions: {
    argTypesRegex: '^on.*'
  },
})

addDecorator((Story) => (
  <ChakraProvider resetCSS>
    <Story />
  </ChakraProvider>
));