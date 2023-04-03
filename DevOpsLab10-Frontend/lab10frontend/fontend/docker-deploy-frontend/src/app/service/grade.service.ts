import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

const getGradeFromScore = gql`
  query getGradeFromScore($score: Float!) {
    getGradeFromScore(score: $score) {
      grade
    }
  }
`;

@Injectable()
export class GradeService {
  constructor(private apollo: Apollo) {}

  getGradeFromScore(score: Number) {
    return this.apollo.watchQuery<any>({
      query: getGradeFromScore,
      variables: {
        score: score
      }
    }).valueChanges;
  }

}
