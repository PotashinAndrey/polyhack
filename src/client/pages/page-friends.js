import Component, { html, css } from '../class/Component.js';
import locator from '../script/locator.js';
import AppList from '../components/app-list.js';
import AppFriendCard from '../components/app-friend-card.js';
import AppListItem from '../components/app-list-item.js';
import $ from '../class/DOM.js';

const attributes = {};
const properties = {};

export const friendList = [
  {
    avatar: '../images/1.jpg',
    name: 'Kamila',
    badge: 'Generous',
    donateAmount: 4312,
    stickersCount: 6,
  },
  {
    avatar: '../images/2.jpg',
    name: 'Diana',
    badge: 'Spectator',
    donateAmount: 0,
    stickersCount: 0,
  },
  {
    avatar: '../images/3.jpg',
    name: '1000-7',
    badge: 'Spectator',
    donateAmount: 20,
    stickersCount: 1,
  },
  {
    avatar: '../images/4.jpg',
    name: 'Ilya',
    badge: 'Indifferent',
    donateAmount: 100,
    stickersCount: 2,
  },
  {
    avatar: '../images/5.jpg',
    name: 'Michael',
    badge: 'Indifferent',
    donateAmount: 32,
    stickersCount: 3,
  }
];

const style = css`
  :host {
    display: block;
    position: relative;
    height: 100%;
    padding: 0 10px !important;
  }
  slot {
    display: block;
  }`;

/** Friends {PageFriends} @class @ui @component <page-friends />
  * description
  */
export default class PageFriends extends Component {
  static template = html`
      <template>
        <style>${style}</style>
        <slot></slot>
        <app-list></app-list>
      </template>`;

  // /** Создание компонента {PageFriends} @constructor
  //   * @param {type} store param-description
  //   */
  //   constructor(store) {
  //     super();
  //     this.store({ store });
  //   }

  /** Создание элемента в DOM (DOM доступен) / mount @lifecycle
    * @param {ShadowRoot} node корневой узел элемента
    * @return {PageFriends} #this текущий компонент
    */
  mount(node) {
    super.mount(node, attributes, properties);

    const info = locator.storage.get("personInfo");

    const getFriends = async () => {
      let friends = [];

      const response = await fetch(`/api/friends?id=${info.id}`, {
        method: "GET",
        body: null,
        headers: {}
      });

      const data = await response.json();
      const friendsFromData = data.data;

      if (!friendsFromData) {
        friends = [];
        return;
      };

      friends = friendsFromData;
      locator.storage.set("friends", friendsFromData);

      const list = $('app-list', node);
      for (let i = 0; i < friends.length; i++) {
        const listItem = new AppListItem();
        const friendCard = new AppFriendCard(friends[i]);
        listItem.append(friendCard);
        list.append(listItem);
      }
    }

    getFriends();

    return this;
  }
}

Component.init(PageFriends, 'page-friends', { attributes, properties });
