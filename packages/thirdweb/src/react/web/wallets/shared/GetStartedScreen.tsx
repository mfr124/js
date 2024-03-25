import { useState } from "react";
import { isMobile } from "../../../core/utils/isMobile.js";
import { Img } from "../../ui/components/Img.js";
import { QRCode } from "../../ui/components/QRCode.js";
import { Spacer } from "../../ui/components/Spacer.js";
import { Container, ModalHeader } from "../../ui/components/basic.js";
import { useCustomTheme } from "../../ui/design-system/CustomThemeProvider.js";
import { StyledButton } from "../../ui/design-system/elements.js";
import { iconSize, spacing, radius } from "../../ui/design-system/index.js";
import { AppleIcon } from "../../ui/ConnectWallet/icons/AppleIcon.js";
import { ChromeIcon } from "../../ui/ConnectWallet/icons/ChromeIcon.js";
import { PlayStoreIcon } from "../../ui/ConnectWallet/icons/PlayStoreIcon.js";
import { Text } from "../../ui/components/text.js";
import { openWindow } from "../../../core/utils/openWindow.js";
import type { InjectedWalletLocale } from "../injected/locale/types.js";

/**
 * @internal
 */
export const GetStartedScreen: React.FC<{
  onBack?: () => void;
  walletName: string;
  walletIconURL: string;
  chromeExtensionLink?: string;
  googlePlayStoreLink?: string;
  appleStoreLink?: string;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  showBack?: boolean;
  locale: InjectedWalletLocale;
}> = ({
  walletName,
  walletIconURL,
  appleStoreLink,
  googlePlayStoreLink,
  chromeExtensionLink,
  header,
  footer,
  onBack,
  locale,
}) => {
  const [showScreen, setShowScreen] = useState<
    "base" | "android-scan" | "ios-scan"
  >("base");

  const isScanScreen =
    showScreen === "android-scan" || showScreen === "ios-scan";

  const handleBack = onBack
    ? () => {
        if (showScreen === "base") {
          onBack();
        } else {
          setShowScreen("base");
        }
      }
    : undefined;

  return (
    <Container fullHeight flex="column" animate="fadein">
      <Container expand flex="column" p="lg">
        {showScreen === "android-scan" && googlePlayStoreLink && (
          <InstallScanScreen
            platformIcon={<PlayStoreIcon size={iconSize.md} />}
            url={googlePlayStoreLink}
            platform="Google Play"
            walletName={walletName}
            walletIconURL={walletIconURL}
            onBack={handleBack}
            locale={{
              scanToDownload: locale.getStartedScreen.instruction,
            }}
          />
        )}

        {showScreen === "ios-scan" && appleStoreLink && (
          <InstallScanScreen
            platformIcon={<AppleIcon size={iconSize.md} />}
            url={appleStoreLink}
            platform="App Store"
            walletName={walletName}
            walletIconURL={walletIconURL}
            onBack={handleBack}
            locale={{
              scanToDownload: locale.getStartedScreen.instruction,
            }}
          />
        )}

        {showScreen === "base" && (
          <Container expand flex="column">
            {header || <ModalHeader onBack={handleBack} title={walletName} />}
            <Spacer y="xl" />

            <Container
              expand
              animate="fadein"
              flex="column"
              center="y"
              style={{
                minHeight: "250px",
              }}
            >
              <Container flex="column" gap="xs">
                {/* Chrome Extension  */}
                {chromeExtensionLink && (
                  <ButtonLink
                    onClick={() => {
                      openWindow(chromeExtensionLink);
                    }}
                  >
                    <ChromeIcon size={iconSize.lg} />
                    <span>{locale.download.chrome}</span>
                  </ButtonLink>
                )}

                {/* Google Play store  */}
                {googlePlayStoreLink && (
                  <ButtonLink
                    as="button"
                    onClick={() => {
                      if (isMobile()) {
                        openWindow(googlePlayStoreLink);
                      } else {
                        setShowScreen("android-scan");
                      }
                    }}
                  >
                    <PlayStoreIcon size={iconSize.lg} />
                    <span>{locale.download.android}</span>
                  </ButtonLink>
                )}

                {/* App Store  */}
                {appleStoreLink && (
                  <ButtonLink
                    as="button"
                    onClick={() => {
                      if (isMobile()) {
                        openWindow(appleStoreLink);
                      } else {
                        setShowScreen("ios-scan");
                      }
                    }}
                  >
                    <AppleIcon size={iconSize.lg} />
                    <span>{locale.download.iOS}</span>
                  </ButtonLink>
                )}
              </Container>
            </Container>
          </Container>
        )}

        {!isScanScreen && footer}
      </Container>
    </Container>
  );
};

/**
 * @internal
 */
const InstallScanScreen: React.FC<{
  url: string;
  platform: string;
  walletName: string;
  platformIcon: React.ReactNode;
  walletIconURL: string;
  onBack?: () => void;
  locale: {
    scanToDownload: string;
  };
}> = (props) => {
  return (
    <Container animate="fadein" expand>
      <ModalHeader title={props.walletName} onBack={props.onBack} />
      <Spacer y="xl" />

      <Container
        flex="column"
        expand
        center="both"
        style={{
          textAlign: "center",
        }}
      >
        <QRCode
          qrCodeUri={props.url}
          QRIcon={
            <Img
              src={props.walletIconURL}
              width={iconSize.xxl}
              height={iconSize.xxl}
            />
          }
        />

        <Spacer y="xl" />

        <Text multiline center balance>
          {props.locale.scanToDownload}
        </Text>

        <Spacer y="xs" />
      </Container>
    </Container>
  );
};

const ButtonLink = /* @__PURE__ */ StyledButton(() => {
  const theme = useCustomTheme();
  return {
    all: "unset",
    textDecoration: "none",
    padding: `${spacing.sm} ${spacing.md}`,
    borderRadius: radius.sm,
    display: "flex",
    alignItems: "center",
    gap: spacing.md,
    cursor: "pointer",
    boxSizing: "border-box",
    width: "100%",
    fontWeight: 500,
    color: theme.colors.secondaryButtonText,
    background: theme.colors.secondaryButtonBg,
    transition: "100ms ease",
    "&:hover": {
      background: theme.colors.secondaryButtonHoverBg,
      textDecoration: "none",
      color: theme.colors.primaryText,
    },
  };
});