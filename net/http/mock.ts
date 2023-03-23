import { MembershipLevel, SpaceProfile } from '@/net/http/patreonComponents';

export interface PatreonInfo {
  creator: SpaceProfile;
  levels: Array<MembershipLevel>;
  outdatedLevels: Array<MembershipLevel>;
}

export const mockPatreonDataSets: PatreonInfo = {
  creator: {
    name: 'KryptoVláďa',
    intro: 'creating videos and podcasts',
    avatar:
      'https://c10.patreonusercontent.com/4/patreon-media/p/campaign/5361899/db9f884692b94514b86d77d8db5e8011/eyJ3IjoyMDB9/3.jpg?token-time=2145916800&token-hash=7WtnRaL4z7mrjEoQPhbvecmc2vM8b70J836wvSnxZJE%3D',
    patreonURL: '123456',
  },
  outdatedLevels: [
    {
      name: 'Člen komunity',
      intro:
        'Přístup na Discord. Otevření místností se všemi ekosystémy, airdropy, farmařením, kam si můžete přijít pro radu. Zavřené zůstavají sekce jako AirdropHunting a podobně',
      image:
        'https://c10.patreonusercontent.com/4/patreon-media/p/reward/8288842/ee4477cd232d42178e346a89be04ec71/eyJ3Ijo0MDB9/1.png?token-time=2145916800&token-hash=ey2dDHB666569dmXQwRcA7xkgc8ZmKFvBskXbr3wAzU%3D',
      id: '111',
      roles: [
        {
          id: '111',
          name: 'Člen komunity',
          color: '#226ce1',
        },
      ],
    },
  ],
  levels: [
    {
      name: 'Člen komunity',
      intro:
        'Přístup na Discord. Otevření místností se všemi ekosystémy, airdropy, farmařením, kam si můžete přijít pro radu. Zavřené zůstavají sekce jako AirdropHunting a podobně',
      image:
        'https://c10.patreonusercontent.com/4/patreon-media/p/reward/8288842/ee4477cd232d42178e346a89be04ec71/eyJ3Ijo0MDB9/1.png?token-time=2145916800&token-hash=ey2dDHB666569dmXQwRcA7xkgc8ZmKFvBskXbr3wAzU%3D',
      id: '111',
      roles: [
        {
          id: '111',
          name: 'Člen komunity',
          color: '#226ce1',
        },
      ],
    },
    {
      name: 'Fanoušek',
      intro:
        'Víc DeFi! Víc krypta! Víc kryptovlády! CO ZA SVÝ PRACHY DOSTANEŠ - odemčení celého Discordu - Patreonké cally - komunitní cally - patreonské srazy - Patreonká videa AirdropHunting',
      image:
        'https://c10.patreonusercontent.com/4/patreon-media/p/reward/5971374/7aaa5c0ed4334d7ab536abebf80741bd/eyJ3Ijo0MDB9/1.png?token-time=2145916800&token-hash=xyUocOxATS5yMtYKfvQcKHv8CS9FDBGq1qcR3HJPhnQ%3D',
      id: '222',
      roles: [{ id: '222', name: 'Fanoušek', color: '#f77a6d' }],
    },
    {
      name: 'KryptoBlázen',
      intro:
        'Jedeme! Jinak než bez krypta to nejde. Chci, aby se všichni lidi na týhle planetě o tom dozvěděli a mile rád obětuju svůj fiat, když to pomůže k osvětě :) CO ZA SVÝ PRACHY DOSTANEŠ - odemčení celého Discordu - Patreonké cally - patreonské srazy - AirdropHunting',
      image:
        'https://c10.patreonusercontent.com/4/patreon-media/p/reward/5971375/e896ec5e508746e4962cbc4afbed93f8/eyJ3Ijo0MDB9/1.png?token-time=2145916800&token-hash=3jWLUC5cNN1a8TuUSlKSGdZGzLAAE6fUCnwfKOBM2vk%3D',
      id: '333',
      roles: [{ id: '333', name: 'KryptoBlázen', color: '#8086a8' }],
    },
  ],
};
