import { Expression } from './Expression';
import { Bulletin } from '../../../Bulletin';
import { Nation, Document } from '../../../types';

export class RequireDocumentForNationExpression extends Expression {
    protected processLine (line: string, bulletin: Bulletin): void {
        const requireRegex = /^Citizens of (.*) require ((.(?!vaccination$))+)$/;
        const lineDecomposition = line.trim().match(requireRegex);
        if (!lineDecomposition) return;
        if (lineDecomposition.length !== 4) {
            throw 'Invalid input: ' + line;
        }
        const nations = lineDecomposition[1];
        const document = <Document>lineDecomposition[2];
        nations.split(', ').forEach((nation: Nation) => {
            bulletin.requireDocumentForNation(nation, document);                   
        });
    }
}
