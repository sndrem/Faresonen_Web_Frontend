import React from "react";
import { shallow, mount, render } from "enzyme";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import LeagueProgress from "./LeagueProgress";
import { Progress } from "semantic-ui-react";
let mock = null;
describe("<LeagueProgess />", () => {
  beforeAll(() => {
    mock = new MockAdapter(axios);
  });

  function createElement() {
    return shallow(
      <LeagueProgress
        leagueName="Premier League"
        tournamentId={230}
        seasonId={340}
      />,
      {
        disableLifecycleMethods: true
      }
    );
  }
  // it("should calulate the correct number of rounds left and finished", () => {
  //   const elem = createElement();
  //   const rounds = [
  //     {
  //       "@uri": "http://api.tv2.no/sport/resources/rounds/150755/",
  //       created: "2017-06-14T10:16:36.183+02:00",
  //       updated: "2017-07-06T13:03:36.209+02:00",
  //       version: "4",
  //       enddate: "2017-08-18T00:00:00+02:00",
  //       id: "150755",
  //       name: "1. runde",
  //       roundNo: "1",
  //       matches: {
  //         "@uri": "http://api.tv2.no/sport/resources/rounds/150755/matches/"
  //       },
  //       season: {
  //         "@uri": "http://api.tv2.no/sport/resources/seasons/339/"
  //       },
  //       startdate: "2017-08-11T00:00:00+02:00",
  //       tournament: {
  //         "@uri": "http://api.tv2.no/sport/resources/tournaments/230/"
  //       }
  //     },
  //     {
  //       "@uri": "http://api.tv2.no/sport/resources/rounds/150756/",
  //       created: "2017-06-14T10:16:37.537+02:00",
  //       updated: "2017-06-14T10:16:37.680+02:00",
  //       version: "3",
  //       enddate: "2017-08-25T00:00:00+02:00",
  //       id: "150756",
  //       name: "2. runde",
  //       roundNo: "2",
  //       matches: {
  //         "@uri": "http://api.tv2.no/sport/resources/rounds/150756/matches/"
  //       },
  //       season: {
  //         "@uri": "http://api.tv2.no/sport/resources/seasons/339/"
  //       },
  //       startdate: "2017-08-19T00:00:00+02:00",
  //       tournament: {
  //         "@uri": "http://api.tv2.no/sport/resources/tournaments/230/"
  //       }
  //     },
  //     {
  //       "@uri": "http://api.tv2.no/sport/resources/rounds/150757/",
  //       created: "2017-06-14T10:16:37.668+02:00",
  //       updated: "2017-06-14T10:16:41.227+02:00",
  //       version: "3",
  //       enddate: "2017-09-08T00:00:00+02:00",
  //       id: "150757",
  //       name: "3. runde",
  //       roundNo: "3",
  //       matches: {
  //         "@uri": "http://api.tv2.no/sport/resources/rounds/150757/matches/"
  //       },
  //       season: {
  //         "@uri": "http://api.tv2.no/sport/resources/seasons/339/"
  //       },
  //       startdate: "2017-08-26T00:00:00+02:00",
  //       tournament: {
  //         "@uri": "http://api.tv2.no/sport/resources/tournaments/230/"
  //       }
  //     },
  //     {
  //       "@uri": "http://api.tv2.no/sport/resources/rounds/150758/",
  //       created: "2017-06-14T10:16:41.212+02:00",
  //       updated: "2017-07-06T13:10:12.988+02:00",
  //       version: "4",
  //       enddate: "2017-09-14T00:00:00+02:00",
  //       id: "150758",
  //       name: "4. runde",
  //       roundNo: "4",
  //       matches: {
  //         "@uri": "http://api.tv2.no/sport/resources/rounds/150758/matches/"
  //       },
  //       season: {
  //         "@uri": "http://api.tv2.no/sport/resources/seasons/339/"
  //       },
  //       startdate: "2017-09-09T00:00:00+02:00",
  //       tournament: {
  //         "@uri": "http://api.tv2.no/sport/resources/tournaments/230/"
  //       }
  //     },
  //     {
  //       "@uri": "http://api.tv2.no/sport/resources/rounds/150759/",
  //       created: "2017-06-14T10:16:41.507+02:00",
  //       updated: "2017-07-06T13:10:12.901+02:00",
  //       version: "4",
  //       enddate: "2017-09-22T00:00:00+02:00",
  //       id: "150759",
  //       name: "5. runde",
  //       roundNo: "5",
  //       matches: {
  //         "@uri": "http://api.tv2.no/sport/resources/rounds/150759/matches/"
  //       },
  //       season: {
  //         "@uri": "http://api.tv2.no/sport/resources/seasons/339/"
  //       },
  //       startdate: "2017-09-15T00:00:00+02:00",
  //       tournament: {
  //         "@uri": "http://api.tv2.no/sport/resources/tournaments/230/"
  //       }
  //     },
  //     {
  //       "@uri": "http://api.tv2.no/sport/resources/rounds/150760/",
  //       created: "2017-06-14T10:16:42.140+02:00",
  //       updated: "2017-06-14T10:16:45.310+02:00",
  //       version: "3",
  //       enddate: "2017-09-29T00:00:00+02:00",
  //       id: "150760",
  //       name: "6. runde",
  //       roundNo: "6",
  //       matches: {
  //         "@uri": "http://api.tv2.no/sport/resources/rounds/150760/matches/"
  //       },
  //       season: {
  //         "@uri": "http://api.tv2.no/sport/resources/seasons/339/"
  //       },
  //       startdate: "2017-09-23T00:00:00+02:00",
  //       tournament: {
  //         "@uri": "http://api.tv2.no/sport/resources/tournaments/230/"
  //       }
  //     },
  //     {
  //       "@uri": "http://api.tv2.no/sport/resources/rounds/150761/",
  //       created: "2017-06-14T10:16:45.291+02:00",
  //       updated: "2017-06-14T10:16:47.767+02:00",
  //       version: "3",
  //       enddate: "2017-10-13T00:00:00+02:00",
  //       id: "150761",
  //       name: "7. runde",
  //       roundNo: "7",
  //       matches: {
  //         "@uri": "http://api.tv2.no/sport/resources/rounds/150761/matches/"
  //       },
  //       season: {
  //         "@uri": "http://api.tv2.no/sport/resources/seasons/339/"
  //       },
  //       startdate: "2017-09-30T00:00:00+02:00",
  //       tournament: {
  //         "@uri": "http://api.tv2.no/sport/resources/tournaments/230/"
  //       }
  //     },
  //     {
  //       "@uri": "http://api.tv2.no/sport/resources/rounds/150762/",
  //       created: "2017-06-14T10:16:47.730+02:00",
  //       updated: "2017-09-23T12:39:32.086+02:00",
  //       version: "4",
  //       enddate: "2017-10-19T00:00:00+02:00",
  //       id: "150762",
  //       name: "8. runde",
  //       roundNo: "8",
  //       matches: {
  //         "@uri": "http://api.tv2.no/sport/resources/rounds/150762/matches/"
  //       },
  //       season: {
  //         "@uri": "http://api.tv2.no/sport/resources/seasons/339/"
  //       },
  //       startdate: "2017-10-14T00:00:00+02:00",
  //       tournament: {
  //         "@uri": "http://api.tv2.no/sport/resources/tournaments/230/"
  //       }
  //     },
  //     {
  //       "@uri": "http://api.tv2.no/sport/resources/rounds/150763/",
  //       created: "2017-06-14T10:16:48.298+02:00",
  //       updated: "2017-09-23T12:39:32.013+02:00",
  //       version: "4",
  //       enddate: "2017-10-27T00:00:00+02:00",
  //       id: "150763",
  //       name: "9. runde",
  //       roundNo: "9",
  //       matches: {
  //         "@uri": "http://api.tv2.no/sport/resources/rounds/150763/matches/"
  //       },
  //       season: {
  //         "@uri": "http://api.tv2.no/sport/resources/seasons/339/"
  //       },
  //       startdate: "2017-10-20T00:00:00+02:00",
  //       tournament: {
  //         "@uri": "http://api.tv2.no/sport/resources/tournaments/230/"
  //       }
  //     },
  //     {
  //       "@uri": "http://api.tv2.no/sport/resources/rounds/150764/",
  //       created: "2017-06-14T10:16:51.194+02:00",
  //       updated: "2017-06-14T10:16:51.639+02:00",
  //       version: "3",
  //       enddate: "2017-11-03T00:00:00+01:00",
  //       id: "150764",
  //       name: "10. runde",
  //       roundNo: "10",
  //       matches: {
  //         "@uri": "http://api.tv2.no/sport/resources/rounds/150764/matches/"
  //       },
  //       season: {
  //         "@uri": "http://api.tv2.no/sport/resources/seasons/339/"
  //       },
  //       startdate: "2017-10-28T00:00:00+02:00",
  //       tournament: {
  //         "@uri": "http://api.tv2.no/sport/resources/tournaments/230/"
  //       }
  //     },
  //     {
  //       "@uri": "http://api.tv2.no/sport/resources/rounds/150765/",
  //       created: "2017-06-14T10:16:51.612+02:00",
  //       updated: "2017-06-14T10:16:53.921+02:00",
  //       version: "3",
  //       enddate: "2017-11-17T00:00:00+01:00",
  //       id: "150765",
  //       name: "11. runde",
  //       roundNo: "11",
  //       matches: {
  //         "@uri": "http://api.tv2.no/sport/resources/rounds/150765/matches/"
  //       },
  //       season: {
  //         "@uri": "http://api.tv2.no/sport/resources/seasons/339/"
  //       },
  //       startdate: "2017-11-04T00:00:00+01:00",
  //       tournament: {
  //         "@uri": "http://api.tv2.no/sport/resources/tournaments/230/"
  //       }
  //     },
  //     {
  //       "@uri": "http://api.tv2.no/sport/resources/rounds/150766/",
  //       created: "2017-06-14T10:16:53.892+02:00",
  //       updated: "2017-09-23T12:39:32.087+02:00",
  //       version: "4",
  //       enddate: "2017-11-23T00:00:00+01:00",
  //       id: "150766",
  //       name: "12. runde",
  //       roundNo: "12",
  //       matches: {
  //         "@uri": "http://api.tv2.no/sport/resources/rounds/150766/matches/"
  //       },
  //       season: {
  //         "@uri": "http://api.tv2.no/sport/resources/seasons/339/"
  //       },
  //       startdate: "2017-11-18T00:00:00+01:00",
  //       tournament: {
  //         "@uri": "http://api.tv2.no/sport/resources/tournaments/230/"
  //       }
  //     },
  //     {
  //       "@uri": "http://api.tv2.no/sport/resources/rounds/150767/",
  //       created: "2017-06-14T10:16:54.525+02:00",
  //       updated: "2017-09-23T12:39:32.027+02:00",
  //       version: "4",
  //       enddate: "2017-11-27T00:00:00+01:00",
  //       id: "150767",
  //       name: "13. runde",
  //       roundNo: "13",
  //       matches: {
  //         "@uri": "http://api.tv2.no/sport/resources/rounds/150767/matches/"
  //       },
  //       season: {
  //         "@uri": "http://api.tv2.no/sport/resources/seasons/339/"
  //       },
  //       startdate: "2017-11-24T00:00:00+01:00",
  //       tournament: {
  //         "@uri": "http://api.tv2.no/sport/resources/tournaments/230/"
  //       }
  //     },
  //     {
  //       "@uri": "http://api.tv2.no/sport/resources/rounds/150768/",
  //       created: "2017-06-14T10:16:57.377+02:00",
  //       updated: "2017-06-14T10:16:59.087+02:00",
  //       version: "3",
  //       enddate: "2017-12-01T00:00:00+01:00",
  //       id: "150768",
  //       name: "14. runde",
  //       roundNo: "14",
  //       matches: {
  //         "@uri": "http://api.tv2.no/sport/resources/rounds/150768/matches/"
  //       },
  //       season: {
  //         "@uri": "http://api.tv2.no/sport/resources/seasons/339/"
  //       },
  //       startdate: "2017-11-28T00:00:00+01:00",
  //       tournament: {
  //         "@uri": "http://api.tv2.no/sport/resources/tournaments/230/"
  //       }
  //     },
  //     {
  //       "@uri": "http://api.tv2.no/sport/resources/rounds/150769/",
  //       created: "2017-06-14T10:16:59.051+02:00",
  //       updated: "2017-06-14T10:16:59.749+02:00",
  //       version: "3",
  //       enddate: "2017-12-08T00:00:00+01:00",
  //       id: "150769",
  //       name: "15. runde",
  //       roundNo: "15",
  //       matches: {
  //         "@uri": "http://api.tv2.no/sport/resources/rounds/150769/matches/"
  //       },
  //       season: {
  //         "@uri": "http://api.tv2.no/sport/resources/seasons/339/"
  //       },
  //       startdate: "2017-12-02T00:00:00+01:00",
  //       tournament: {
  //         "@uri": "http://api.tv2.no/sport/resources/tournaments/230/"
  //       }
  //     },
  //     {
  //       "@uri": "http://api.tv2.no/sport/resources/rounds/150770/",
  //       created: "2017-06-14T10:16:59.710+02:00",
  //       updated: "2017-06-14T10:17:02.992+02:00",
  //       version: "3",
  //       enddate: "2017-12-11T00:00:00+01:00",
  //       id: "150770",
  //       name: "16. runde",
  //       roundNo: "16",
  //       matches: {
  //         "@uri": "http://api.tv2.no/sport/resources/rounds/150770/matches/"
  //       },
  //       season: {
  //         "@uri": "http://api.tv2.no/sport/resources/seasons/339/"
  //       },
  //       startdate: "2017-12-09T00:00:00+01:00",
  //       tournament: {
  //         "@uri": "http://api.tv2.no/sport/resources/tournaments/230/"
  //       }
  //     },
  //     {
  //       "@uri": "http://api.tv2.no/sport/resources/rounds/150771/",
  //       created: "2017-06-14T10:17:02.945+02:00",
  //       updated: "2017-06-14T10:17:03.717+02:00",
  //       version: "3",
  //       enddate: "2017-12-15T00:00:00+01:00",
  //       id: "150771",
  //       name: "17. runde",
  //       roundNo: "17",
  //       matches: {
  //         "@uri": "http://api.tv2.no/sport/resources/rounds/150771/matches/"
  //       },
  //       season: {
  //         "@uri": "http://api.tv2.no/sport/resources/seasons/339/"
  //       },
  //       startdate: "2017-12-12T00:00:00+01:00",
  //       tournament: {
  //         "@uri": "http://api.tv2.no/sport/resources/tournaments/230/"
  //       }
  //     },
  //     {
  //       "@uri": "http://api.tv2.no/sport/resources/rounds/150772/",
  //       created: "2017-06-14T10:17:03.670+02:00",
  //       updated: "2017-11-04T07:45:05.867+01:00",
  //       version: "4",
  //       enddate: "2017-12-21T00:00:00+01:00",
  //       id: "150772",
  //       name: "18. runde",
  //       roundNo: "18",
  //       matches: {
  //         "@uri": "http://api.tv2.no/sport/resources/rounds/150772/matches/"
  //       },
  //       season: {
  //         "@uri": "http://api.tv2.no/sport/resources/seasons/339/"
  //       },
  //       startdate: "2017-12-16T00:00:00+01:00",
  //       tournament: {
  //         "@uri": "http://api.tv2.no/sport/resources/tournaments/230/"
  //       }
  //     },
  //     {
  //       "@uri": "http://api.tv2.no/sport/resources/rounds/150773/",
  //       created: "2017-06-14T10:17:07.096+02:00",
  //       updated: "2017-11-04T07:45:05.762+01:00",
  //       version: "4",
  //       enddate: "2017-12-25T00:00:00+01:00",
  //       id: "150773",
  //       name: "19. runde",
  //       roundNo: "19",
  //       matches: {
  //         "@uri": "http://api.tv2.no/sport/resources/rounds/150773/matches/"
  //       },
  //       season: {
  //         "@uri": "http://api.tv2.no/sport/resources/seasons/339/"
  //       },
  //       startdate: "2017-12-22T00:00:00+01:00",
  //       tournament: {
  //         "@uri": "http://api.tv2.no/sport/resources/tournaments/230/"
  //       }
  //     },
  //     {
  //       "@uri": "http://api.tv2.no/sport/resources/rounds/150774/",
  //       created: "2017-06-14T10:17:07.791+02:00",
  //       updated: "2017-06-14T10:17:08.739+02:00",
  //       version: "3",
  //       enddate: "2017-12-29T00:00:00+01:00",
  //       id: "150774",
  //       name: "20. runde",
  //       roundNo: "20",
  //       matches: {
  //         "@uri": "http://api.tv2.no/sport/resources/rounds/150774/matches/"
  //       },
  //       season: {
  //         "@uri": "http://api.tv2.no/sport/resources/seasons/339/"
  //       },
  //       startdate: "2017-12-26T00:00:00+01:00",
  //       tournament: {
  //         "@uri": "http://api.tv2.no/sport/resources/tournaments/230/"
  //       }
  //     },
  //     {
  //       "@uri": "http://api.tv2.no/sport/resources/rounds/150775/",
  //       created: "2017-06-14T10:17:08.684+02:00",
  //       updated: "2017-06-14T10:17:12.041+02:00",
  //       version: "3",
  //       enddate: "2017-12-31T00:00:00+01:00",
  //       id: "150775",
  //       name: "21. runde",
  //       roundNo: "21",
  //       matches: {
  //         "@uri": "http://api.tv2.no/sport/resources/rounds/150775/matches/"
  //       },
  //       season: {
  //         "@uri": "http://api.tv2.no/sport/resources/seasons/339/"
  //       },
  //       startdate: "2017-12-30T00:00:00+01:00",
  //       tournament: {
  //         "@uri": "http://api.tv2.no/sport/resources/tournaments/230/"
  //       }
  //     },
  //     {
  //       "@uri": "http://api.tv2.no/sport/resources/rounds/150776/",
  //       created: "2017-06-14T10:17:11.986+02:00",
  //       updated: "2017-06-14T10:17:13.065+02:00",
  //       version: "3",
  //       enddate: "2018-01-12T00:00:00+01:00",
  //       id: "150776",
  //       name: "22. runde",
  //       roundNo: "22",
  //       matches: {
  //         "@uri": "http://api.tv2.no/sport/resources/rounds/150776/matches/"
  //       },
  //       season: {
  //         "@uri": "http://api.tv2.no/sport/resources/seasons/339/"
  //       },
  //       startdate: "2018-01-01T00:00:00+01:00",
  //       tournament: {
  //         "@uri": "http://api.tv2.no/sport/resources/tournaments/230/"
  //       }
  //     },
  //     {
  //       "@uri": "http://api.tv2.no/sport/resources/rounds/150777/",
  //       created: "2017-06-14T10:17:13.006+02:00",
  //       updated: "2017-06-14T10:17:16.044+02:00",
  //       version: "3",
  //       enddate: "2018-01-19T00:00:00+01:00",
  //       id: "150777",
  //       name: "23. runde",
  //       roundNo: "23",
  //       matches: {
  //         "@uri": "http://api.tv2.no/sport/resources/rounds/150777/matches/"
  //       },
  //       season: {
  //         "@uri": "http://api.tv2.no/sport/resources/seasons/339/"
  //       },
  //       startdate: "2018-01-13T00:00:00+01:00",
  //       tournament: {
  //         "@uri": "http://api.tv2.no/sport/resources/tournaments/230/"
  //       }
  //     },
  //     {
  //       "@uri": "http://api.tv2.no/sport/resources/rounds/150778/",
  //       created: "2017-06-14T10:17:15.993+02:00",
  //       updated: "2017-06-14T10:17:16.890+02:00",
  //       version: "3",
  //       enddate: "2018-01-29T00:00:00+01:00",
  //       id: "150778",
  //       name: "24. runde",
  //       roundNo: "24",
  //       matches: {
  //         "@uri": "http://api.tv2.no/sport/resources/rounds/150778/matches/"
  //       },
  //       season: {
  //         "@uri": "http://api.tv2.no/sport/resources/seasons/339/"
  //       },
  //       startdate: "2018-01-20T00:00:00+01:00",
  //       tournament: {
  //         "@uri": "http://api.tv2.no/sport/resources/tournaments/230/"
  //       }
  //     },
  //     {
  //       "@uri": "http://api.tv2.no/sport/resources/rounds/150779/",
  //       created: "2017-06-14T10:17:16.832+02:00",
  //       updated: "2017-06-14T10:17:20.491+02:00",
  //       version: "3",
  //       enddate: "2018-02-02T00:00:00+01:00",
  //       id: "150779",
  //       name: "25. runde",
  //       roundNo: "25",
  //       matches: {
  //         "@uri": "http://api.tv2.no/sport/resources/rounds/150779/matches/"
  //       },
  //       season: {
  //         "@uri": "http://api.tv2.no/sport/resources/seasons/339/"
  //       },
  //       startdate: "2018-01-30T00:00:00+01:00",
  //       tournament: {
  //         "@uri": "http://api.tv2.no/sport/resources/tournaments/230/"
  //       }
  //     },
  //     {
  //       "@uri": "http://api.tv2.no/sport/resources/rounds/150780/",
  //       created: "2017-06-14T10:17:20.428+02:00",
  //       updated: "2017-06-14T10:17:21.346+02:00",
  //       version: "3",
  //       enddate: "2018-02-09T00:00:00+01:00",
  //       id: "150780",
  //       name: "26. runde",
  //       roundNo: "26",
  //       matches: {
  //         "@uri": "http://api.tv2.no/sport/resources/rounds/150780/matches/"
  //       },
  //       season: {
  //         "@uri": "http://api.tv2.no/sport/resources/seasons/339/"
  //       },
  //       startdate: "2018-02-03T00:00:00+01:00",
  //       tournament: {
  //         "@uri": "http://api.tv2.no/sport/resources/tournaments/230/"
  //       }
  //     },
  //     {
  //       "@uri": "http://api.tv2.no/sport/resources/rounds/150781/",
  //       created: "2017-06-14T10:17:21.286+02:00",
  //       updated: "2017-06-14T10:17:24.992+02:00",
  //       version: "3",
  //       enddate: "2018-02-23T00:00:00+01:00",
  //       id: "150781",
  //       name: "27. runde",
  //       roundNo: "27",
  //       matches: {
  //         "@uri": "http://api.tv2.no/sport/resources/rounds/150781/matches/"
  //       },
  //       season: {
  //         "@uri": "http://api.tv2.no/sport/resources/seasons/339/"
  //       },
  //       startdate: "2018-02-10T00:00:00+01:00",
  //       tournament: {
  //         "@uri": "http://api.tv2.no/sport/resources/tournaments/230/"
  //       }
  //     },
  //     {
  //       "@uri": "http://api.tv2.no/sport/resources/rounds/150782/",
  //       created: "2017-06-14T10:17:24.926+02:00",
  //       updated: "2017-06-14T10:17:25.911+02:00",
  //       version: "3",
  //       enddate: "2018-03-02T00:00:00+01:00",
  //       id: "150782",
  //       name: "28. runde",
  //       roundNo: "28",
  //       matches: {
  //         "@uri": "http://api.tv2.no/sport/resources/rounds/150782/matches/"
  //       },
  //       season: {
  //         "@uri": "http://api.tv2.no/sport/resources/seasons/339/"
  //       },
  //       startdate: "2018-02-24T00:00:00+01:00",
  //       tournament: {
  //         "@uri": "http://api.tv2.no/sport/resources/tournaments/230/"
  //       }
  //     },
  //     {
  //       "@uri": "http://api.tv2.no/sport/resources/rounds/150783/",
  //       created: "2017-06-14T10:17:25.846+02:00",
  //       updated: "2017-06-14T10:17:28.996+02:00",
  //       version: "3",
  //       enddate: "2018-03-09T00:00:00+01:00",
  //       id: "150783",
  //       name: "29. runde",
  //       roundNo: "29",
  //       matches: {
  //         "@uri": "http://api.tv2.no/sport/resources/rounds/150783/matches/"
  //       },
  //       season: {
  //         "@uri": "http://api.tv2.no/sport/resources/seasons/339/"
  //       },
  //       startdate: "2018-03-03T00:00:00+01:00",
  //       tournament: {
  //         "@uri": "http://api.tv2.no/sport/resources/tournaments/230/"
  //       }
  //     },
  //     {
  //       "@uri": "http://api.tv2.no/sport/resources/rounds/150784/",
  //       created: "2017-06-14T10:17:28.932+02:00",
  //       updated: "2018-02-28T09:21:25.312+01:00",
  //       version: "4",
  //       enddate: "2018-03-15T00:00:00+01:00",
  //       id: "150784",
  //       name: "30. runde",
  //       roundNo: "30",
  //       matches: {
  //         "@uri": "http://api.tv2.no/sport/resources/rounds/150784/matches/"
  //       },
  //       season: {
  //         "@uri": "http://api.tv2.no/sport/resources/seasons/339/"
  //       },
  //       startdate: "2018-03-10T00:00:00+01:00",
  //       tournament: {
  //         "@uri": "http://api.tv2.no/sport/resources/tournaments/230/"
  //       }
  //     },
  //     {
  //       "@uri": "http://api.tv2.no/sport/resources/rounds/150785/",
  //       created: "2017-06-14T10:17:29.972+02:00",
  //       updated: "2018-02-28T09:21:25.244+01:00",
  //       version: "4",
  //       enddate: "2018-03-30T00:00:00+02:00",
  //       id: "150785",
  //       name: "31. runde",
  //       roundNo: "31",
  //       matches: {
  //         "@uri": "http://api.tv2.no/sport/resources/rounds/150785/matches/"
  //       },
  //       season: {
  //         "@uri": "http://api.tv2.no/sport/resources/seasons/339/"
  //       },
  //       startdate: "2018-03-16T00:00:00+01:00",
  //       tournament: {
  //         "@uri": "http://api.tv2.no/sport/resources/tournaments/230/"
  //       }
  //     },
  //     {
  //       "@uri": "http://api.tv2.no/sport/resources/rounds/150786/",
  //       created: "2017-06-14T10:17:33.315+02:00",
  //       updated: "2017-06-14T10:17:34.191+02:00",
  //       version: "3",
  //       enddate: "2018-04-06T00:00:00+02:00",
  //       id: "150786",
  //       name: "32. runde",
  //       roundNo: "32",
  //       matches: {
  //         "@uri": "http://api.tv2.no/sport/resources/rounds/150786/matches/"
  //       },
  //       season: {
  //         "@uri": "http://api.tv2.no/sport/resources/seasons/339/"
  //       },
  //       startdate: "2018-03-31T00:00:00+02:00",
  //       tournament: {
  //         "@uri": "http://api.tv2.no/sport/resources/tournaments/230/"
  //       }
  //     },
  //     {
  //       "@uri": "http://api.tv2.no/sport/resources/rounds/150787/",
  //       created: "2017-06-14T10:17:34.119+02:00",
  //       updated: "2017-06-14T10:17:35.195+02:00",
  //       version: "3",
  //       enddate: "2018-04-13T00:00:00+02:00",
  //       id: "150787",
  //       name: "33. runde",
  //       roundNo: "33",
  //       matches: {
  //         "@uri": "http://api.tv2.no/sport/resources/rounds/150787/matches/"
  //       },
  //       season: {
  //         "@uri": "http://api.tv2.no/sport/resources/seasons/339/"
  //       },
  //       startdate: "2018-04-07T00:00:00+02:00",
  //       tournament: {
  //         "@uri": "http://api.tv2.no/sport/resources/tournaments/230/"
  //       }
  //     },
  //     {
  //       "@uri": "http://api.tv2.no/sport/resources/rounds/150788/",
  //       created: "2017-06-14T10:17:35.108+02:00",
  //       updated: "2018-02-28T09:24:32.175+01:00",
  //       version: "4",
  //       enddate: "2018-04-19T00:00:00+02:00",
  //       id: "150788",
  //       name: "34. runde",
  //       roundNo: "34",
  //       matches: {
  //         "@uri": "http://api.tv2.no/sport/resources/rounds/150788/matches/"
  //       },
  //       season: {
  //         "@uri": "http://api.tv2.no/sport/resources/seasons/339/"
  //       },
  //       startdate: "2018-04-14T00:00:00+02:00",
  //       tournament: {
  //         "@uri": "http://api.tv2.no/sport/resources/tournaments/230/"
  //       }
  //     },
  //     {
  //       "@uri": "http://api.tv2.no/sport/resources/rounds/150789/",
  //       created: "2017-06-14T10:17:38.738+02:00",
  //       updated: "2018-02-28T09:26:47.301+01:00",
  //       version: "6",
  //       enddate: "2018-04-27T00:00:00+02:00",
  //       id: "150789",
  //       name: "35. runde",
  //       roundNo: "35",
  //       matches: {
  //         "@uri": "http://api.tv2.no/sport/resources/rounds/150789/matches/"
  //       },
  //       season: {
  //         "@uri": "http://api.tv2.no/sport/resources/seasons/339/"
  //       },
  //       startdate: "2018-04-20T00:00:00+02:00",
  //       tournament: {
  //         "@uri": "http://api.tv2.no/sport/resources/tournaments/230/"
  //       }
  //     },
  //     {
  //       "@uri": "http://api.tv2.no/sport/resources/rounds/150790/",
  //       created: "2017-06-14T10:17:41.644+02:00",
  //       updated: "2018-02-28T09:26:47.293+01:00",
  //       version: "5",
  //       enddate: "2018-05-04T00:00:00+02:00",
  //       id: "150790",
  //       name: "36. runde",
  //       roundNo: "36",
  //       matches: {
  //         "@uri": "http://api.tv2.no/sport/resources/rounds/150790/matches/"
  //       },
  //       season: {
  //         "@uri": "http://api.tv2.no/sport/resources/seasons/339/"
  //       },
  //       startdate: "2018-04-28T00:00:00+02:00",
  //       tournament: {
  //         "@uri": "http://api.tv2.no/sport/resources/tournaments/230/"
  //       }
  //     },
  //     {
  //       "@uri": "http://api.tv2.no/sport/resources/rounds/150791/",
  //       created: "2017-06-14T10:17:42.404+02:00",
  //       updated: "2017-06-14T10:17:46.756+02:00",
  //       version: "3",
  //       enddate: "2018-05-12T00:00:00+02:00",
  //       id: "150791",
  //       name: "37. runde",
  //       roundNo: "37",
  //       matches: {
  //         "@uri": "http://api.tv2.no/sport/resources/rounds/150791/matches/"
  //       },
  //       season: {
  //         "@uri": "http://api.tv2.no/sport/resources/seasons/339/"
  //       },
  //       startdate: "2018-05-05T00:00:00+02:00",
  //       tournament: {
  //         "@uri": "http://api.tv2.no/sport/resources/tournaments/230/"
  //       }
  //     },
  //     {
  //       "@uri": "http://api.tv2.no/sport/resources/rounds/150792/",
  //       created: "2017-06-14T10:17:46.670+02:00",
  //       updated: "2017-06-14T10:17:46.757+02:00",
  //       version: "2",
  //       enddate: "2018-07-13T00:00:00+02:00",
  //       id: "150792",
  //       name: "38. runde",
  //       roundNo: "38",
  //       matches: {
  //         "@uri": "http://api.tv2.no/sport/resources/rounds/150792/matches/"
  //       },
  //       season: {
  //         "@uri": "http://api.tv2.no/sport/resources/seasons/339/"
  //       },
  //       startdate: "2018-05-13T00:00:00+02:00",
  //       tournament: {
  //         "@uri": "http://api.tv2.no/sport/resources/tournaments/230/"
  //       }
  //     }
  //   ];
  //   const calculated = elem.instance().calculateRounds(rounds);
  //   expect(calculated).toEqual({ finished: 28, left: 10 });
  // });

  // it("should return a default object if an empty round list is specified", () => {
  //   const elem = createElement();
  //   const rounds = [];
  //   const calculated = elem.instance().calculateRounds(rounds);
  //   expect(calculated).toEqual({ finished: 0, left: 0 });
  // });

  // it("should throw an error if no rounds are specified", () => {
  //   const elem = createElement();
  //   const rounds = undefined;
  //   function calculate() {
  //     elem.instance().calculateRounds(rounds);
  //   }
  //   expect(calculate).toThrow();
  // });

  it("start off with default state", () => {
    const elem = createElement();
    const defaultState = {
      finished: 0,
      left: 0,
      total: 0,
      loading: true
    };

    expect(defaultState).toEqual(elem.state());
  });

  it("should have a className of no-print", () => {
    const elem = createElement();
    const progress = elem.find(Progress);
    expect(progress.hasClass("no-print")).toEqual(true);
  });

  it("should initialize with correct props", () => {
    const elem = createElement();
    const progressElement = elem.find(Progress);
    const { color, progress, total, value } = progressElement.props();
    expect(color).toEqual("green");
    expect(progress).toEqual("ratio");
    expect(total).toEqual(0);
    expect(value).toEqual(0);
    // expect(progress.props()int')).toEqual(true);
  });
});
