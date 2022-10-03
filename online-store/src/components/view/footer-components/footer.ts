import { NodeControl } from '../../../common/ts/classes/node';

export class Footer extends NodeControl {
  constructor(parentNode: HTMLElement) {
    const content = `
    <a class="footer__git" href="https://github.com/Mariia22"></a>
    <a class="footer__rss" href="https://rs.school/js/"></a>
    <div class='footer__copyright'>&copy; 2022</div>
    `;
    super(parentNode, 'footer', 'footer wrapper', content);
  }
}
