import { Component } from '@stencil/core';

@Component({
  tag: 'exa-search-form',
  styleUrl: 'exa-search-form.scss',
  
})
export class ExaSearchForm {
	render() {
	  return (
	    <form class="search" action="/" method="get">
	      <input type="text" name="s" placeholder="Search..."></input>
	      <input type="submit" value="Submit"></input>
	    </form> 
	  );
	}

}
