import { Elem } from '../../../types/data';
import { SourceItem } from '../../../types/sources-type';
import './sources.css';

class Sources {
    draw(data: SourceItem[]) {
        const fragment: DocumentFragment = document.createDocumentFragment();
        const sourceItemTemp: Elem = document.querySelector('#sourceItemTemp');

        data.forEach((item) => {
            const sourceClone: Elem = sourceItemTemp?.content.cloneNode(true) as Elem;

            if (!(sourceClone instanceof DocumentFragment)) return;

            const sourceName: Elem = sourceClone.querySelector('.source__item-name');
            if (sourceName) sourceName.textContent = item.name;

            const sourceItem: Elem = sourceClone.querySelector('.source__item');
            if (sourceItem) sourceItem.setAttribute('data-source-id', item.id);

            fragment.append(sourceClone);
        });

        const sources: Elem = document.querySelector('.sources');
        if (sources) sources.append(fragment);
    }
}

export default Sources;
