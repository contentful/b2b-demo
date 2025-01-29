import { useAppContext } from '@/hooks';
import { AppContextState } from '@/hooks/app-context';

type RewriteRule = {
  pattern: RegExp;
  target: string;
};

class SlugRewriter {
  private appState: AppContextState;
  public rules: Array<RewriteRule>;

  constructor() {
    var { state } = useAppContext();
    this.appState = state;

    this.rules = [
      { pattern: /^articles\/(.)+$/, target: 'articles/article-template' },
      {
        pattern: /^dashboard$/,
        target: this.appState.currentUserRoles[0],
      },
      {
        pattern: /^dashboard\/(.)*$/,
        target: this.appState.currentUserRoles[0],
      },
      { pattern: /^products\/?$/, target: 'catalog' },
      { pattern: /^products\/(.)+$/, target: 'products/product-template' },
    ];
  }

  public process(slug: string): string {
    if (!slug) return '/';
    // if (/^\/?(.)*$/.test(slug) && !this.appState.currentUser) return '/';

    let newSlug = slug;

    this.rules.forEach(({ pattern, target }) => {
      if (pattern.test(slug)) newSlug = target;
    });

    return newSlug;
  }
}

export default SlugRewriter;
