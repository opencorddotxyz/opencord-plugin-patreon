interface PatreonCreator {
  id: string;
  name: string;
  description: string;
  image: string;
}

interface Role {
  name: string;
  color: string;
}

interface PatreonLevel {
  id: string;
  name: string;
  description: string;
  image: string;
  role?: Role;
}

export interface PatreonInfo {
  creator: PatreonCreator;
  levels: PatreonLevel[];
}

export const mockPatreonDatas: PatreonInfo = {
  creator: {
    name: 'KryptoVláďa',
    description: 'creating videos and podcasts',
    image:
      'https://c10.patreonusercontent.com/4/patreon-media/p/campaign/5361899/db9f884692b94514b86d77d8db5e8011/eyJ3IjoyMDB9/3.jpg?token-time=2145916800&token-hash=7WtnRaL4z7mrjEoQPhbvecmc2vM8b70J836wvSnxZJE%3D',
    id: '123456',
  },
  levels: [
    {
      name: 'Člen komunity',
      description:
        'Přístup na Discord. Otevření místností se všemi ekosystémy, airdropy, farmařením, kam si můžete přijít pro radu. Zavřené zůstavají sekce jako AirdropHunting a podobně',
      image:
        'https://c10.patreonusercontent.com/4/patreon-media/p/reward/8288842/ee4477cd232d42178e346a89be04ec71/eyJ3Ijo0MDB9/1.png?token-time=2145916800&token-hash=ey2dDHB666569dmXQwRcA7xkgc8ZmKFvBskXbr3wAzU%3D',
      id: '111',
      role: {
        name: 'Člen komunity',
        color: '#226ce1',
      },
    },
    {
      name: 'Fanoušek',
      description:
        'Víc DeFi! Víc krypta! Víc kryptovlády! CO ZA SVÝ PRACHY DOSTANEŠ - odemčení celého Discordu - Patreonké cally - komunitní cally - patreonské srazy - Patreonká videa AirdropHunting',
      image:
        'https://c10.patreonusercontent.com/4/patreon-media/p/reward/5971374/7aaa5c0ed4334d7ab536abebf80741bd/eyJ3Ijo0MDB9/1.png?token-time=2145916800&token-hash=xyUocOxATS5yMtYKfvQcKHv8CS9FDBGq1qcR3HJPhnQ%3D',
      id: '222',
      role: {
        name: 'Fanoušek',
        color: '#f77a6d',
      },
    },
    {
      name: 'KryptoBlázen',
      description:
        'Jedeme! Jinak než bez krypta to nejde. Chci, aby se všichni lidi na týhle planetě o tom dozvěděli a mile rád obětuju svůj fiat, když to pomůže k osvětě :) CO ZA SVÝ PRACHY DOSTANEŠ - odemčení celého Discordu - Patreonké cally - patreonské srazy - AirdropHunting',
      image:
        'https://c10.patreonusercontent.com/4/patreon-media/p/reward/5971375/e896ec5e508746e4962cbc4afbed93f8/eyJ3Ijo0MDB9/1.png?token-time=2145916800&token-hash=3jWLUC5cNN1a8TuUSlKSGdZGzLAAE6fUCnwfKOBM2vk%3D',
      id: '333',
      role: {
        name: 'KryptoBlázen',
        color: '#8086a8',
      },
    },
    {
      name: 'KryptoKokot',
      description:
        'Speciální druh patronátu pro Vítka a všechny jemu podobné, keří neví, co s prachama a chtěji mi je dát :)',
      image:
        'https://c10.patreonusercontent.com/4/patreon-media/p/reward/8289282/3e3363795ad74a4db8a3a5fde913dd0c/eyJ3Ijo0MDB9/1.jpg?token-time=2145916800&token-hash=SLz9i4Z6LdX5DyO3pBE7AKzc0dDqNvtkZo4_HfcDsyk%3D',
      id: '444',
    },
  ],
};
