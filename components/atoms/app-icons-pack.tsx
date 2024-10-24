import React from "react";
import { Image, ImageRequireSource } from "react-native";

/**
 * https://akveo.github.io/react-native-ui-kitten/docs/guides/icon-packages#3rd-party-icon-packages
 */
const IconProvider = (source: ImageRequireSource) => ({
  toReactElement: ({ style }: { style: any }) => (
    <Image style={style} source={source} />
  ),
});

export const AppIconsPack = {
  name: "app",
  icons: {
    auth: IconProvider(require("@/assets/img/icons/icon-auth.png")),
    "auth-dark": IconProvider(require("@/assets/img/icons/icon-auth-dark.png")),
    social: IconProvider(require("@/assets/img/icons/icon-social.png")),
    "social-dark": IconProvider(
      require("@/assets/img/icons/icon-social-dark.png")
    ),
    articles: IconProvider(require("@/assets/img/icons/icon-articles.png")),
    "articles-dark": IconProvider(
      require("@/assets/img/icons/icon-articles-dark.png")
    ),
    messaging: IconProvider(require("@/assets/img/icons/icon-messaging.png")),
    "messaging-dark": IconProvider(
      require("@/assets/img/icons/icon-messaging-dark.png")
    ),
    dashboards: IconProvider(require("@/assets/img/icons/icon-dashboards.png")),
    "dashboards-dark": IconProvider(
      require("@/assets/img/icons/icon-dashboards-dark.png")
    ),
    ecommerce: IconProvider(require("@/assets/img/icons/icon-ecommerce.png")),
    "ecommerce-dark": IconProvider(
      require("@/assets/img/icons/icon-ecommerce-dark.png")
    ),
    autocomplete: IconProvider(
      require("@/assets/img/icons/icon-autocomplete.png")
    ),
    "autocomplete-dark": IconProvider(
      require("@/assets/img/icons/icon-autocomplete-dark.png")
    ),
    avatar: IconProvider(require("@/assets/img/icons/icon-avatar.png")),
    "avatar-dark": IconProvider(
      require("@/assets/img/icons/icon-avatar-dark.png")
    ),
    "bottom-navigation": IconProvider(
      require("@/assets/img/icons/icon-bottom-navigation.png")
    ),
    "bottom-navigation-dark": IconProvider(
      require("@/assets/img/icons/icon-bottom-navigation-dark.png")
    ),
    button: IconProvider(require("@/assets/img/icons/icon-button.png")),
    "button-dark": IconProvider(
      require("@/assets/img/icons/icon-button-dark.png")
    ),
    "button-group": IconProvider(
      require("@/assets/img/icons/icon-button-group.png")
    ),
    "button-group-dark": IconProvider(
      require("@/assets/img/icons/icon-button-group-dark.png")
    ),
    calendar: IconProvider(require("@/assets/img/icons/icon-calendar.png")),
    "calendar-dark": IconProvider(
      require("@/assets/img/icons/icon-calendar-dark.png")
    ),
    card: IconProvider(require("@/assets/img/icons/icon-card.png")),
    "card-dark": IconProvider(require("@/assets/img/icons/icon-card-dark.png")),
    "check-box": IconProvider(require("@/assets/img/icons/icon-checkbox.png")),
    "check-box-dark": IconProvider(
      require("@/assets/img/icons/icon-checkbox-dark.png")
    ),
    datepicker: IconProvider(require("@/assets/img/icons/icon-datepicker.png")),
    "datepicker-dark": IconProvider(
      require("@/assets/img/icons/icon-datepicker-dark.png")
    ),
    drawer: IconProvider(require("@/assets/img/icons/icon-drawer.png")),
    "drawer-dark": IconProvider(
      require("@/assets/img/icons/icon-drawer-dark.png")
    ),
    icon: IconProvider(require("@/assets/img/icons/icon-icon.png")),
    "icon-dark": IconProvider(require("@/assets/img/icons/icon-icon-dark.png")),
    input: IconProvider(require("@/assets/img/icons/icon-input.png")),
    "input-dark": IconProvider(
      require("@/assets/img/icons/icon-input-dark.png")
    ),
    list: IconProvider(require("@/assets/img/icons/icon-list.png")),
    "list-dark": IconProvider(require("@/assets/img/icons/icon-list-dark.png")),
    menu: IconProvider(require("@/assets/img/icons/icon-menu.png")),
    "menu-dark": IconProvider(require("@/assets/img/icons/icon-menu-dark.png")),
    modal: IconProvider(require("@/assets/img/icons/icon-modal.png")),
    "modal-dark": IconProvider(
      require("@/assets/img/icons/icon-modal-dark.png")
    ),
    "overflow-menu": IconProvider(
      require("@/assets/img/icons/icon-overflow-menu.png")
    ),
    "overflow-menu-dark": IconProvider(
      require("@/assets/img/icons/icon-overflow-menu-dark.png")
    ),
    popover: IconProvider(require("@/assets/img/icons/icon-popover.png")),
    "popover-dark": IconProvider(
      require("@/assets/img/icons/icon-popover-dark.png")
    ),
    radio: IconProvider(require("@/assets/img/icons/icon-radio.png")),
    "radio-dark": IconProvider(
      require("@/assets/img/icons/icon-radio-dark.png")
    ),
    select: IconProvider(require("@/assets/img/icons/icon-select.png")),
    "select-dark": IconProvider(
      require("@/assets/img/icons/icon-select-dark.png")
    ),
    spinner: IconProvider(require("@/assets/img/icons/icon-spinner.png")),
    "spinner-dark": IconProvider(
      require("@/assets/img/icons/icon-spinner-dark.png")
    ),
    "tab-view": IconProvider(require("@/assets/img/icons/icon-tab-view.png")),
    "tab-view-dark": IconProvider(
      require("@/assets/img/icons/icon-tab-view-dark.png")
    ),
    text: IconProvider(require("@/assets/img/icons/icon-text.png")),
    "text-dark": IconProvider(require("@/assets/img/icons/icon-text-dark.png")),
    toggle: IconProvider(require("@/assets/img/icons/icon-toggle.png")),
    "toggle-dark": IconProvider(
      require("@/assets/img/icons/icon-toggle-dark.png")
    ),
    tooltip: IconProvider(require("@/assets/img/icons/icon-tooltip.png")),
    "tooltip-dark": IconProvider(
      require("@/assets/img/icons/icon-tooltip-dark.png")
    ),
    "top-navigation": IconProvider(
      require("@/assets/img/icons/icon-top-navigation.png")
    ),
    "top-navigation-dark": IconProvider(
      require("@/assets/img/icons/icon-top-navigation-dark.png")
    ),
  },
};
