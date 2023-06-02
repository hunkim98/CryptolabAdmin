import "../styles/globals.css";
import type { AppProps } from "next/app";
import { wrapper } from "../store";
// import { AuthContextProvider } from "../components/AuthProvider/AuthProvider";
import {
  AppShell,
  Burger,
  Header,
  MantineProvider,
  MediaQuery,
  Navbar,
  Text,
  Button,
} from "@mantine/core";
import { useState } from "react";
import Link from "next/link";
import { ContextModalProps, ModalsProvider } from "@mantine/modals";
import axios from "axios";
import { Provider } from "react-redux";

const AlertModal = ({
  context,
  id,
  innerProps,
}: ContextModalProps<{ modalBody: string }>) => (
  <>
    <Text size="sm">{innerProps.modalBody}</Text>
    <Button fullWidth mt="md" onClick={() => context.closeModal(id)}>
      닫기
    </Button>
  </>
);

function MyApp({ Component, pageProps, ...rest }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(rest);
  const [opened, setOpened] = useState(false);
  axios.defaults.withCredentials = true; // even for get requests if
  return (
    <Provider store={store}>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          /** Put your mantine theme override here */
          colorScheme: "dark",
        }}
      >
        {/* <AuthContextProvider> */}
        <ModalsProvider modals={{ alert: AlertModal }}>
          {/* <AuthWrapper> */}
          <AppShell
            styles={(theme) => ({
              main: {
                backgroundColor:
                  theme.colorScheme === "dark"
                    ? theme.colors.dark[8]
                    : theme.colors.gray[0],
              },
            })}
            navbarOffsetBreakpoint="sm"
            fixed
            navbar={
              <Navbar
                hiddenBreakpoint="sm"
                hidden={!opened}
                style={{ padding: "0 20px", zIndex: 50 }}
                width={{ sm: 200, lg: 300 }}
              >
                <Navbar.Section>
                  <h3>
                    <Link href="/">Home</Link>
                  </h3>
                </Navbar.Section>
                <Navbar.Section mt="md">
                  <Link href="/">Check Complaints</Link>
                </Navbar.Section>
                <Navbar.Section mt="md">
                  <Link href="/post">Reply to Complaint</Link>
                </Navbar.Section>
              </Navbar>
            }
            header={
              <Header height={70}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    height: "100%",
                    padding: "0 20px",
                  }}
                >
                  <MediaQuery largerThan="sm" styles={{ display: "none" }}>
                    <Burger
                      opened={opened}
                      onClick={() => setOpened((o) => !o)}
                      size="sm"
                      mr="xl"
                    />
                  </MediaQuery>
                  <Link href="/">
                    <Text>
                      <h1>Heean Enterprise</h1>
                    </Text>
                  </Link>
                </div>
              </Header>
            }
          >
            <Component {...pageProps} />
          </AppShell>
          {/* </AuthWrapper> */}
        </ModalsProvider>
        {/* </AuthContextProvider> */}
      </MantineProvider>
    </Provider>
  );
}

export default MyApp;
