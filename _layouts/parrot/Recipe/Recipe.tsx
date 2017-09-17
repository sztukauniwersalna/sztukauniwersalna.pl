import * as React from 'react';
import { ReactNode, ReactElement } from 'react';
import { Link } from 'react-router-dom';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import { Page, Tag, Website } from 'paramorph/models';

import Icon from '../Icon';

const s = require('./Recipe.scss');

export interface IngredientProps {
  title : string;
  quantity ?: string;
}

export function Ingredient({ title, quantity } : IngredientProps) {
  return (
    <li>
      { title }
      { quantity
        ? <span className={ s.quantity }>{ ` (${quantity})` }</span>
        : null }
    </li>
  );
}

export interface MethodProps {
  children : ReactNode;
}

export function Method({ children } : MethodProps) {
  return (
    <p>{ children }</p>
  );
}

export interface Props {
  title : string;
  photo : string;
  altText : string;
  time : string;
  level : string;
  mealFor : string;
  children : ReactElement<IngredientProps | MethodProps>[];
}

export function Recipe({ title, photo, altText, time, level, mealFor, children } : Props) {
  const childs = ([] as ReactElement<IngredientProps | MethodProps>[]).concat(children);

  const ingredients = childs.filter(c => c.type === Ingredient);
  const methods = childs.filter(c => c.type === Method);

  return (
    <div className={ `${s.recipe} contrast` }>
      <div className={ s.header }>
        <h2>{ title }</h2>
        <ul>
          <li key='1' title='posiłek dla'><Icon name='child_care' />{ mealFor }</li>
          <li key='2' title='poziom trudności'><Icon name='whatshot'/>{ level }</li>
          <li key='3' title='czas przygotowania'><Icon name='access_time' />{ time }</li>
        </ul>
      </div>

      <img src={ photo } alt={ altText } />

      <div className={ s.details }>
        <div className={ s.ingredients }>
          <h3>Składniki</h3>
          <div className='compact'>
            <ol>
              { ingredients }
            </ol>
          </div>
        </div>

        <div className={ s.method }>
          <h3>Sposób Przygotowania</h3>
          { methods }
        </div>
      </div>
    </div>
  );
}

export default withStyles(s)(Recipe);

