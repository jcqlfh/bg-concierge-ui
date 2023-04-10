import React, {useContext, useState} from 'react';
import {Portal, SegmentedButtons, Snackbar, Text} from 'react-native-paper';
import {Image, ScrollView, TouchableHighlight, View} from 'react-native';
import Title from '@shared/components/title/Title';
import CommonStyles from '@shared/styles/common.style';
import ListChooser from '@shared/components/listChooser/ListChooser';
import CloseButton from '@shared/components/closeButton/CloseButton';
import ListDisplay from '@shared/components/listDisplay/ListDisplay';
import SearchModel from '../models/SearchModel';
import Loading from '@shared/components/loading/Loading';
import { SuggestionContext } from '@shared/context/SuggestionContext';
import { FirebaseApp, getApp, getApps, initializeApp } from 'firebase/app'
import { getAuth, signInWithEmailAndPassword } from '@firebase/auth'
import { collectionGroup, collection, getDocs, initializeFirestore, query, where, documentId } from '@firebase/firestore'
import { Boardgame } from '@shared/context/Boardgame';
import { FIREBASE_CONFIG, FIREBASE_USER, FIREBASE_PASS } from '@env'

function SearchView({navigation}: any): JSX.Element {
  const context = useContext(SuggestionContext);

  const [categories, setCategories] = useState([
    {name: 'Abstract Strategy', checked: false},
    {name: 'Action / Dexterity', checked: false},
    {name: 'Adventure', checked: false},
    {name: 'Age of Reason', checked: false},
    {name: 'American Civil War', checked: false},
    {name: 'American Indian Wars', checked: false},
    {name: 'American Revolutionary War', checked: false},
    {name: 'American West', checked: false},
    {name: 'Ancient', checked: false},
    {name: 'Animals', checked: false},
    {name: 'Arabian', checked: false},
    {name: 'Aviation / Flight', checked: false},
    {name: 'Bluffing', checked: false},
    {name: 'Book', checked: false},
    {name: 'Card Game', checked: false},
    {name: 'Childrens Game', checked: false},
    {name: 'City Building', checked: false},
    {name: 'Civil War', checked: false},
    {name: 'Civilization', checked: false},
    {name: 'Collectible Components', checked: false},
    {name: 'Comic Book / Strip', checked: false},
    {name: 'Deduction', checked: false},
    {name: 'Dice', checked: false},
    {name: 'Economic', checked: false},
    {name: 'Educational', checked: false},
    {name: 'Electronic', checked: false},
    {name: 'Environmental', checked: false},
    {name: 'Expansion for Base-game', checked: false},
    {name: 'Exploration', checked: false},
    {name: 'Fan Expansion', checked: false},
    {name: 'Fantasy', checked: false},
    {name: 'Farming', checked: false},
    {name: 'Fighting', checked: false},
    {name: 'Game System', checked: false},
    {name: 'Horror', checked: false},
    {name: 'Humor', checked: false},
    {name: 'Industry / Manufacturing', checked: false},
    {name: 'Korean War', checked: false},
    {name: 'Mafia', checked: false},
    {name: 'Math', checked: false},
    {name: 'Mature / Adult', checked: false},
    {name: 'Maze', checked: false},
    {name: 'Medical', checked: false},
    {name: 'Medieval', checked: false},
    {name: 'Memory', checked: false},
    {name: 'Miniatures', checked: false},
    {name: 'Modern Warfare', checked: false},
    {name: 'Movies / TV / Radio theme', checked: false},
    {name: 'Murder/Mystery', checked: false},
    {name: 'Music', checked: false},
    {name: 'Mythology', checked: false},
    {name: 'Napoleonic', checked: false},
    {name: 'Nautical', checked: false},
    {name: 'Negotiation', checked: false},
    {name: 'Novel-based', checked: false},
    {name: 'Number', checked: false},
    {name: 'Party Game', checked: false},
    {name: 'Pike and Shot', checked: false},
    {name: 'Pirates', checked: false},
    {name: 'Political', checked: false},
    {name: 'Post-Napoleonic', checked: false},
    {name: 'Prehistoric', checked: false},
    {name: 'Print & Play', checked: false},
    {name: 'Puzzle', checked: false},
    {name: 'Racing', checked: false},
    {name: 'Real-time', checked: false},
    {name: 'Religious', checked: false},
    {name: 'Renaissance', checked: false},
    {name: 'Science Fiction', checked: false},
    {name: 'Space Exploration', checked: false},
    {name: 'Spies/Secret Agents', checked: false},
    {name: 'Sports', checked: false},
    {name: 'Territory Building', checked: false},
    {name: 'Trains', checked: false},
    {name: 'Transportation', checked: false},
    {name: 'Travel', checked: false},
    {name: 'Trivia', checked: false},
    {name: 'Video Game Theme', checked: false},
    {name: 'Vietnam War', checked: false},
    {name: 'Wargame', checked: false},
    {name: 'Word Game', checked: false},
    {name: 'World War I', checked: false},
    {name: 'World War II', checked: false},
    {name: 'Zombies', checked: false},
  ]);

  const [mechanics, setMechanics] = useState([
    {name: 'Acting', checked: false},
    {name: 'Action Drafting', checked: false},
    {name: 'Action Points', checked: false},
    {name: 'Action Queue', checked: false},
    {name: 'Action Retrieval', checked: false},
    {name: 'Action Timer', checked: false},
    {name: 'Action/Event', checked: false},
    {name: 'Advantage Token', checked: false},
    {name: 'Alliances', checked: false},
    {name: 'Area Majority / Influence', checked: false},
    {name: 'Area Movement', checked: false},
    {name: 'Area-Impulse', checked: false},
    {name: 'Auction', checked: false},
    {name: 'Automatic Resource Growth', checked: false},
    {name: 'Betting and Bluffing', checked: false},
    {name: 'Bias', checked: false},
    {name: 'Bids As Wagers', checked: false},
    {name: 'Bingo', checked: false},
    {name: 'Bribery', checked: false},
    {name: 'Campaign / Battle Card Driven', checked: false},
    {name: 'Card Play Conflict Resolution', checked: false},
    {name: 'Catch the Leader', checked: false},
    {name: 'Chaining', checked: false},
    {name: 'Chit-Pull System', checked: false},
    {name: 'Closed Drafting', checked: false},
    {name: 'Closed Economy Auction', checked: false},
    {name: 'Command Cards', checked: false},
    {name: 'Commodity Speculation', checked: false},
    {name: 'Communication Limits', checked: false},
    {name: 'Connections', checked: false},
    {name: 'Constrained Bidding', checked: false},
    {name: 'Contracts', checked: false},
    {name: 'Cooperative Game', checked: false},
    {name: 'Crayon Rail System', checked: false},
    {name: 'Critical Hits and Failures', checked: false},
    {name: 'Cube Tower', checked: false},
    {name: 'Deck Construction', checked: false},
    {name: 'Deck, Bag, and Pool Building', checked: false},
    {name: 'Deduction', checked: false},
    {name: 'Delayed Purchase', checked: false},
    {name: 'Dice Rolling', checked: false},
    {name: 'Die Icon Resolution', checked: false},
    {name: 'Different Dice Movement', checked: false},
    {name: 'Drawing', checked: false},
    {name: 'Elapsed Real Time Ending', checked: false},
    {name: 'Enclosure', checked: false},
    {name: 'End Game Bonuses', checked: false},
    {name: 'Events', checked: false},
    {name: 'Finale Ending', checked: false},
    {name: 'Flicking', checked: false},
    {name: 'Follow', checked: false},
    {name: 'Force Commitment', checked: false},
    {name: 'Grid Coverage', checked: false},
    {name: 'Grid Movement', checked: false},
    {name: 'Hand Management', checked: false},
    {name: 'Hexagon Grid', checked: false},
    {name: 'Hidden Movement', checked: false},
    {name: 'Hidden Roles', checked: false},
    {name: 'Hidden Victory Points', checked: false},
    {name: 'Highest-Lowest Scoring', checked: false},
    {name: 'Hot Potato', checked: false},
    {name: 'I Cut, You Choose', checked: false},
    {name: 'Impulse Movement', checked: false},
    {name: 'Income', checked: false},
    {name: 'Increase Value of Unchosen Resources', checked: false},
    {name: 'Induction', checked: false},
    {name: 'Interrupts', checked: false},
    {name: 'Investment', checked: false},
    {name: 'Kill Steal', checked: false},
    {name: 'King of the Hill', checked: false},
    {name: 'Ladder Climbing', checked: false},
    {name: 'Layering', checked: false},
    {name: 'Legacy Game', checked: false},
    {name: 'Line Drawing', checked: false},
    {name: 'Line of Sight', checked: false},
    {name: 'Loans', checked: false},
    {name: 'Lose a Turn', checked: false},
    {name: 'Mancala', checked: false},
    {name: 'Map Addition', checked: false},
    {name: 'Map Deformation', checked: false},
    {name: 'Map Reduction', checked: false},
    {name: 'Market', checked: false},
    {name: 'Matching', checked: false},
    {name: 'Measurement Movement', checked: false},
    {name: 'Melding and Splaying', checked: false},
    {name: 'Memory', checked: false},
    {name: 'Minimap Resolution', checked: false},
    {name: 'Modular Board', checked: false},
    {name: 'Move Through Deck', checked: false},
    {name: 'Movement Points', checked: false},
    {name: 'Movement Template', checked: false},
    {name: 'Moving Multiple Units', checked: false},
    {name: 'Multi-Use Cards', checked: false},
    {name: 'Multiple Maps', checked: false},
    {name: 'Narrative Choice / Paragraph', checked: false},
    {name: 'Negotiation', checked: false},
    {name: 'Neighbor Scope', checked: false},
    {name: 'Network and Route Building', checked: false},
    {name: 'Once-Per-Game Abilities', checked: false},
    {name: 'Open Drafting', checked: false},
    {name: 'Order Counters', checked: false},
    {name: 'Ordering', checked: false},
    {name: 'Ownership', checked: false},
    {name: 'Paper-and-Pencil', checked: false},
    {name: 'Passed Action Token', checked: false},
    {name: 'Pattern Building', checked: false},
    {name: 'Pattern Movement', checked: false},
    {name: 'Pattern Recognition', checked: false},
    {name: 'Physical Removal', checked: false},
    {name: 'Pick-up and Deliver', checked: false},
    {name: 'Pieces as Map', checked: false},
    {name: 'Player Elimination', checked: false},
    {name: 'Player Judge', checked: false},
    {name: 'Point to Point Movement', checked: false},
    {name: 'Predictive Bid', checked: false},
    {name: 'Prisoners Dilemma', checked: false},
    {name: 'Programmed Movement', checked: false},
    {name: 'Push Your Luck', checked: false},
    {name: 'Questions and Answers', checked: false},
    {name: 'Race', checked: false},
    {name: 'Random Production', checked: false},
    {name: 'Ratio / Combat Results Table', checked: false},
    {name: 'Re-rolling and Locking', checked: false},
    {name: 'Real-Time', checked: false},
    {name: 'Relative Movement', checked: false},
    {name: 'Resource Queue', checked: false},
    {name: 'Resource to Move', checked: false},
    {name: 'Rock-Paper-Scissors', checked: false},
    {name: 'Role Playing', checked: false},
    {name: 'Roles with Asymmetric Information', checked: false},
    {name: 'Roll / Spin and Move', checked: false},
    {name: 'Rondel', checked: false},
    {name: 'Scenario / Mission / Campaign Game', checked: false},
    {name: 'Score-and-Reset Game', checked: false},
    {name: 'Secret Unit Deployment', checked: false},
    {name: 'Selection Order Bid', checked: false},
    {name: 'Semi-Cooperative Game', checked: false},
    {name: 'Set Collection', checked: false},
    {name: 'Simulation', checked: false},
    {name: 'Simultaneous Action Selection', checked: false},
    {name: 'Singing', checked: false},
    {name: 'Single Loser Game', checked: false},
    {name: 'Slide/Push', checked: false},
    {name: 'Solo / Solitaire Game', checked: false},
    {name: 'Speed Matching', checked: false},
    {name: 'Square Grid', checked: false},
    {name: 'Stacking and Balancing', checked: false},
    {name: 'Stat Check Resolution', checked: false},
    {name: 'Static Capture', checked: false},
    {name: 'Stock Holding', checked: false},
    {name: 'Storytelling', checked: false},
    {name: 'Sudden Death Ending', checked: false},
    {name: 'Tags', checked: false},
    {name: 'Take That', checked: false},
    {name: 'Targeted Clues', checked: false},
    {name: 'Team-Based Game', checked: false},
    {name: 'Tech Trees / Tech Tracks', checked: false},
    {name: 'Three Dimensional Movement', checked: false},
    {name: 'Tile Placement', checked: false},
    {name: 'Track Movement', checked: false},
    {name: 'Trading', checked: false},
    {name: 'Traitor Game', checked: false},
    {name: 'Trick-taking', checked: false},
    {name: 'Tug of War', checked: false},
    {name: 'Turn Order', checked: false},
    {name: 'Variable Phase Order', checked: false},
    {name: 'Variable Player Powers', checked: false},
    {name: 'Variable Set-up', checked: false},
    {name: 'Victory Points as a Resource', checked: false},
    {name: 'Voting', checked: false},
    {name: 'Worker Placement', checked: false},
    {name: 'Zone of Control', checked: false},
  ]);

  const [search, setSearch] = useState<SearchModel>(context.value.search ?? {});
  const [visibleMechanics, setVisibleMechanics] = React.useState(false);
  const [visibleCategories, setVisibleCategories] = React.useState(false);
  const [isLoading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState('Loading...');
  const [snackOn, setSnackOn] = useState(false)
  const [snackText, setSnackText] = useState('')

  const showDialogMechanics = () => {
    mechanics.forEach(
      m => (m.checked = !!search.mechanics?.find(name => name === m.name)),
    );
    setVisibleMechanics(true);
  };
  const hideDialogMechanics = () => {
    search.mechanics = mechanics.filter(m => m.checked).map(m => m.name);
    setVisibleMechanics(false);
  };
  const showDialogCategories = () => {
    categories.forEach(
      m => (m.checked = !!search.categories?.find(name => name === m.name)),
    );
    setVisibleCategories(true);
  };
  const hideDialogCategories = () => {
    search.categories = categories.filter(m => m.checked).map(m => m.name);
    setVisibleCategories(false);
  };

  const onSearchButtonPressCallback = async () => {
    setLoading(true)

    let app: FirebaseApp;
    if (getApps().length === 0) {
      app = initializeApp(JSON.parse(FIREBASE_CONFIG));
    } else {
      app = getApp();
    }

    const auth = getAuth();
    const boardgames = await signInWithEmailAndPassword(auth, FIREBASE_USER, FIREBASE_PASS)
      .then(async () =>{
          var boardgames: Boardgame[] = []

          const db = initializeFirestore(app, {
            experimentalForceLongPolling: true,
          });

          if(context.value.colectionItems.length > 0) {
            const collectionId = [...context.value.colectionItems];
            while(collectionId.length > 0) {
              const suggestionsQuery = query(collection(db, 'boardgames'), where('Id', 'in', collectionId.splice(0, collectionId.length > 10 ? 10 : collectionId.length)))
              const docs = await getDocs(suggestionsQuery);
              docs.forEach(doc => boardgames.push(doc.data() as Boardgame))
            }

            if(!boardgames.length)
              return boardgames;
          } else {

            var groupCollectionName = 'boardgame';

            switch(context.value.collection) {
              case 'BGG TOP 100' :
                groupCollectionName = 'boardgame';
                break;
              case 'BGG Strategy TOP 100' :
                groupCollectionName = 'strategygames';
                break;
              case 'BGG Abstracts TOP 100' :
                groupCollectionName = 'abstracts';
                break;
              case 'BGG Family TOP 100' :
                groupCollectionName = 'familygames';
                break;
            }

            const suggestionsQuery = query(collectionGroup(db, groupCollectionName), where('Value', '>', 0), where('Value', '<=', 100));
            const rank = await getDocs(suggestionsQuery);
            const rankedDocs = rank.docs.map(doc => doc?.ref?.parent?.parent?.id ?? "0").filter(r => r !== "0");
            while(rankedDocs.length > 0) {
              const queryRanks = query(collection(db, 'boardgames'), where('__name__', 'in', rankedDocs.splice(0, rankedDocs.length > 10 ? 10 : rankedDocs.length)))
              const docs = await getDocs(queryRanks);
              docs.forEach(doc => boardgames.push(doc.data() as Boardgame))
            }
          }
          
          if(boardgames.length == 0)
            return boardgames;

          if(search.numPlayers) {
            if (boardgames.length > 0) {
              switch(search.numPlayers)
              {
                case 'small':
                  boardgames = [...boardgames.filter(b=> b.MaxPlayers >= 1 && b.MaxPlayers <= 2)]
                  break
                case 'medium':
                  boardgames = [...boardgames.filter(b=> b.MaxPlayers >= 3 && b.MaxPlayers <= 4)]
                  break
                case 'large':
                  boardgames = [...boardgames.filter(b=> b.MaxPlayers >= 5)]
                  break
              }
            }

            if(boardgames.length == 0)
              return boardgames;
          }

          if(search.duration) {
            if (boardgames.length > 0) {
              switch(search.duration)
              {
                case 'short':
                  boardgames = [...boardgames.filter(b => b.PlayingTime <= 30)];
                  break
                case 'medium':
                  boardgames = [...boardgames.filter(b => b.PlayingTime <= 60)];
                  break
                case 'long':
                  boardgames = [...boardgames.filter(b => b.PlayingTime <= 120)];
                  break
              }
            }

            if(boardgames.length == 0)
              return boardgames;
          }
          
          if(search.difficulty) {
            if (boardgames.length > 0) {
              switch(search.difficulty)
              {
                case 'easy':
                  boardgames = [...boardgames.filter(b => b.Statistics.AverageWeight >= 0 && b.Statistics.AverageWeight < 2)];
                  break
                case 'medium':
                  boardgames = [...boardgames.filter(b => b.Statistics.AverageWeight >= 2 && b.Statistics.AverageWeight < 4)];
                  break
                case 'hard':
                  boardgames = [...boardgames.filter(b => b.Statistics.AverageWeight >= 4)];
                  break
              }
            }

            if(boardgames.length == 0)
              return boardgames;
          }
            
          if(search.categories?.length > 0) {
            if (boardgames.length > 0) {
              boardgames = [...boardgames.filter(b => b.Categories.some(c => search.categories.join().match(c)))]
            }

            if(!boardgames.length)
              return boardgames;
          }

          if(search.mechanics?.length > 0) {
            if (boardgames.length > 0) {
              boardgames = [...boardgames.filter(b => b.Mechanics.some(m => search.mechanics.join().match(m)))]
            }

            if(boardgames.length == 0)
              return boardgames;
          }
          
          return boardgames;
      })
      .catch(reason => {
          console.log(reason)
          setLoading(false);
          setSnackOn(true);
          setSnackText('Error while searching the boargames in database');
      });

    if(!boardgames?.length) {
      setLoading(false);
      setSnackOn(true);
      setSnackText('No boardgame found for this parameters setting.');
      return;
    }

    context.setValue({
      ...context.value,
      search: search,
      suggestions: boardgames as Boardgame[]
    })

    navigation.navigate('Suggestion');
    setTimeout(() => {
      setLoading(false)}, 1000);
  };

  const numPlayerHasValue = () => !!search.numPlayers;
  const durationHasValue = () => !!search.duration;
  const difficultyHasValue = () => !!search.difficulty;
  const mechanicsHasValue = () =>
    !!search.mechanics && search.mechanics.length > 0;
  const categoriesHasValue = () =>
    !!search.categories && search.categories.length > 0;
  const searchHasValue = () =>
    numPlayerHasValue() ||
    durationHasValue() ||
    difficultyHasValue() ||
    mechanicsHasValue() ||
    categoriesHasValue();

  if(isLoading)
    return <Loading text={loadingText} />
  else
    return (
      <View style={CommonStyles.Styles.expandSize}>
        <Title text={'Select the Parameters'} />
        <View style={CommonStyles.Styles.expandSize}>
          <ScrollView removeClippedSubviews={false}>
            {/* #NUM PLAYERS VIEW */}
            <View
              style={[
                {
                  flexDirection: 'row',
                  backgroundColor: numPlayerHasValue()
                    ? CommonStyles.Colors.primary
                    : CommonStyles.Colors.gray,
                },
                CommonStyles.Styles.defaultSpacing,
              ]}>
              <Image
                style={CommonStyles.Styles.squareSize64}
                source={require('@assets/images/num_players.png')}
              />
              <View
                style={[CommonStyles.Styles.expandSize, {marginHorizontal: 10}]}>
                <View style={CommonStyles.Styles.rowReverseCentered}>
                  <Text
                    style={[
                      CommonStyles.Styles.secondaryText,
                      CommonStyles.Styles.expandSize,
                      {marginBottom: 5},
                    ]}>
                    Number of Players
                  </Text>
                  <CloseButton
                    isVisible={numPlayerHasValue()}
                    onPress={() => setSearch({...search, numPlayers: ''})}
                  />
                </View>
                <SegmentedButtons
                  value={search.numPlayers}
                  onValueChange={value =>
                    setSearch({...search, numPlayers: value})
                  }
                  buttons={[
                    {
                      value: 'small',
                      label: '1-2',
                    },
                    {
                      value: 'medium',
                      label: '3-4',
                    },
                    {value: 'large', label: '5+'},
                  ]}
                />
              </View>
            </View>

            {/* DURATION VIEW */}
            <View
              style={[
                {
                  flexDirection: 'row',
                  backgroundColor: durationHasValue()
                    ? CommonStyles.Colors.primary
                    : CommonStyles.Colors.gray,
                },
                CommonStyles.Styles.defaultSpacing,
              ]}>
              <Image
                style={CommonStyles.Styles.squareSize64}
                source={require('@assets/images/duration.png')}
              />
              <View
                style={[CommonStyles.Styles.expandSize, {marginHorizontal: 10}]}>
                <View style={CommonStyles.Styles.rowReverseCentered}>
                  <Text
                    style={[
                      CommonStyles.Styles.secondaryText,
                      CommonStyles.Styles.expandSize,
                      {marginBottom: 5},
                    ]}>
                    Duration (up to)
                  </Text>
                  <CloseButton
                    isVisible={durationHasValue()}
                    onPress={() => setSearch({...search, duration: ''})}
                  />
                </View>
                <SegmentedButtons
                  value={search.duration}
                  onValueChange={value => setSearch({...search, duration: value})}
                  buttons={[
                    {
                      value: 'short',
                      label: '30min',
                    },
                    {
                      value: 'medium',
                      label: '60min',
                    },
                    {
                      value: 'long',
                      label: '120min',
                    },
                  ]}
                />
              </View>
            </View>

            {/* DIFFICULTY VIEW */}
            <View
              style={[
                {
                  flexDirection: 'row',
                  backgroundColor: difficultyHasValue()
                    ? CommonStyles.Colors.primary
                    : CommonStyles.Colors.gray,
                },
                CommonStyles.Styles.defaultSpacing,
              ]}>
              <Image
                style={CommonStyles.Styles.squareSize64}
                source={require('@assets/images/difficulty.png')}
              />
              <View
                style={[CommonStyles.Styles.expandSize, {marginHorizontal: 10}]}>
                <View
                  style={{flexDirection: 'row-reverse', alignItems: 'center'}}>
                  <Text
                    style={[
                      CommonStyles.Styles.secondaryText,
                      CommonStyles.Styles.expandSize,
                      {marginBottom: 5},
                    ]}>
                    Difficulty
                  </Text>
                  <CloseButton
                    isVisible={difficultyHasValue()}
                    onPress={() => setSearch({...search, difficulty: ''})}
                  />
                </View>
                <SegmentedButtons
                  value={search.difficulty}
                  onValueChange={value =>
                    setSearch({...search, difficulty: value})
                  }
                  buttons={[
                    {
                      value: 'easy',
                      label: 'Easy',
                    },
                    {
                      value: 'medium',
                      label: 'Medium',
                    },
                    {
                      value: 'hard',
                      label: 'Hard',
                    },
                  ]}
                />
              </View>
            </View>

            {/* MECHANICS VIEW */}
            <View
              style={[
                {
                  flexDirection: 'row',
                  backgroundColor: mechanicsHasValue()
                    ? CommonStyles.Colors.primary
                    : CommonStyles.Colors.gray,
                },
                CommonStyles.Styles.defaultSpacing,
              ]}>
              <Image
                style={CommonStyles.Styles.squareSize64}
                source={require('@assets/images/mechanic.png')}
              />
              <View
                style={[CommonStyles.Styles.expandSize, {marginHorizontal: 10}]}>
                <View style={CommonStyles.Styles.rowReverseCentered}>
                  <Text
                    style={[
                      CommonStyles.Styles.secondaryText,
                      CommonStyles.Styles.expandSize,
                      {marginBottom: 5},
                    ]}>
                    Mechanics
                  </Text>
                  <CloseButton
                    isVisible={mechanicsHasValue()}
                    onPress={() => setSearch({...search, mechanics: []})}
                  />
                </View>
                <ListDisplay
                  title="Choose Mechanics"
                  onShowDialog={showDialogMechanics}
                  showList={mechanicsHasValue()}
                  data={search.mechanics}
                  onClearData={m =>
                    setSearch({
                      ...search,
                      mechanics: search.mechanics.filter(sf => sf !== m),
                    })
                  }
                />
                <Portal>
                  <ListChooser
                    isVisible={visibleMechanics}
                    onDismiss={hideDialogMechanics}
                    data={mechanics}
                    setData={setMechanics}
                  />
                </Portal>
              </View>
            </View>

            {/* CATEGORY VIEW */}
            <View
              style={[
                {
                  flexDirection: 'row',
                  backgroundColor: categoriesHasValue()
                    ? CommonStyles.Colors.primary
                    : CommonStyles.Colors.gray,
                },
                CommonStyles.Styles.defaultSpacing,
              ]}>
              <Image
                style={CommonStyles.Styles.squareSize64}
                source={require('@assets/images/category.png')}
              />
              <View
                style={[CommonStyles.Styles.expandSize, {marginHorizontal: 10}]}>
                <View style={CommonStyles.Styles.rowReverseCentered}>
                  <Text
                    style={[
                      CommonStyles.Styles.secondaryText,
                      CommonStyles.Styles.expandSize,
                      {marginBottom: 5},
                    ]}>
                    Categories
                  </Text>
                  <CloseButton
                    isVisible={categoriesHasValue()}
                    onPress={() => setSearch({...search, categories: []})}
                  />
                </View>
                <ListDisplay
                  title="Choose Categories"
                  onShowDialog={showDialogCategories}
                  showList={categoriesHasValue()}
                  data={search.categories}
                  onClearData={m =>
                    setSearch({
                      ...search,
                      categories: search.categories.filter(sf => sf !== m),
                    })
                  }
                />
                <Portal>
                  <ListChooser
                    isVisible={visibleCategories}
                    onDismiss={hideDialogCategories}
                    data={categories}
                    setData={setCategories}
                  />
                </Portal>
              </View>
            </View>
          </ScrollView>
        </View>

        <TouchableHighlight activeOpacity={0.6}>
          <View
            onTouchEndCapture={() =>
              searchHasValue() && onSearchButtonPressCallback()
            }
            style={[
              {
                flexDirection: 'row',
                backgroundColor: searchHasValue()
                  ? CommonStyles.Colors.secondary
                  : CommonStyles.Colors.gray,
                marginTop: 10,
                padding: 10,
              },
              CommonStyles.Styles.centerContent,
            ]}>
            <Image
              style={CommonStyles.Styles.squareSize64}
              source={require('@assets/images/search.png')}
            />
            <View style={{marginHorizontal: 10}}>
              <Text style={CommonStyles.Styles.bottomButtonText}>SEARCH</Text>
            </View>
          </View>
        </TouchableHighlight>
        <Snackbar
          visible={snackOn}
          onDismiss={() => setSnackOn(false)}
        >
          {snackText}
        </Snackbar>
      </View>
    );
}

export default SearchView;
