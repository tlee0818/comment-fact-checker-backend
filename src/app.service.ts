import { Injectable } from '@nestjs/common';
import { LanguageServiceClient, v1 } from '@google-cloud/language';
import axios from 'axios';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}

type ClaimReview = {
  publisher: { name: string; site: string };
  url: string;
  title: string;
  reviewDate: string;
  textualRating: string;
  languageCode: string;
};

type Claims = {
  text: string;
  claimant: string;
  claimDate: string;
  claimReview: ClaimReview | null;
};

type GetClaimsResponse = {
  data: Claims[];
};

@Injectable()
export class EntityAnalysisService {
  async queryFactCheck(texts: string[], languageCode: string, apiKey: string) {

    try {
      const { data } = await axios.get<GetClaimsResponse>(
        'https://factchecktools.googleapis.com/v1alpha1/claims:search',
        {
          headers: {
            Accept: 'application/json',
          },
          params: {
            key: apiKey,
            query: texts.join(" "),
            languageCode: languageCode
          },
        },
      );

      return data

    }
    catch (error) {
      if (axios.isAxiosError(error)) {
        console.log('error message: ', error.message);
        return error.message;
      } else {
        console.log('unexpected error: ', error);
        return 'An unexpected error occurred';
      }
    }
  }

  async analyzeEntities(text: string): Promise<any> {
    const client: LanguageServiceClient = new LanguageServiceClient();

    const document: any = {
      content: text,
      language: "EN",
      type: 'PLAIN_TEXT',
    };

    const [result]: any = await client.analyzeEntities({ document })

    return result.entities.map(obj => obj.name);
  }
}
