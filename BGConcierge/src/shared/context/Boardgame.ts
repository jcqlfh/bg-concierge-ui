export interface Boardgame {
    Categories: string[]
    Description: string
    Id: number
    MaxPlayTime: number
    MaxPlayers: number
    Mechanics: any[]
    MinAge: number
    MinPlayTime: number
    MinPlayers: number
    Name: string
    PlayingTime: number
    Statistics: Statistics
    Thumbnail: string
    YearPublished: number
  }
  
  export interface Statistics {
    Avarage: number
    AverageWeight: number
    BayesAverage: number
    Comments: number
    Median: number
    Owned: number
    Ranks: any[]
    StandardDeviation: number
    Trading: number
    UsersRated: number
    Wanting: number
    Weights: number
    Whishing: number
  }