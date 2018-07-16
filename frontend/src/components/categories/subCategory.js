import React, { Component } from 'react';
import { connect } from 'react-redux';
import './opinionated.css';
import './react-treeview.css';
import { fetchSubCategory } from '../../actions/subCategoryAction'
import TreeView from 'react-treeview';

const dataSource = [
  {
    type: 'Astrophysics',
    collapsed: false,
    code: 'astro-ph',
    sub: [
      {name: 'Cosmology and Nongalactic Astrophysics', code: 'astro-ph.CO', collapsed: false},
      {name: 'Earth and Planetary Astrophysics', code: 'astro-ph.EP', collapsed: false},
      {name: 'Astrophysics of Galaxies', code: 'astro-ph.GA', collapsed: false},
      {name: 'High Energy Astrophysical Phenomena', code: 'astro-ph.HE', collapsed: false},
      {name: 'Instrumentation and Methods for Astrophysics', code: 'astro-ph.IM', collapsed: false},
      {name: 'Solar and Stellar Astrophysics', code: 'astro-ph.SR', collapsed: false},
    ],
  },
  {
    type: 'Condensed Matter',
    collapsed: false,
    code: 'cond-mat',
    sub: [
      {name: 'Disordered Systems and Neural Networks', code: 'cond-mat.dis-nn', collapsed: false},
      {name: 'Mesoscale and Nanoscale Physics', code: 'cond-mat.mes-hall', collapsed: false},
      {name: 'Materials Science', code: 'cond-mat.mtrl-sci', collapsed: false},
      {name: 'Other Condensed Matter', code: 'cond-mat.other', collapsed: false},
      {name: 'Quantum Gases', code: 'cond-mat.quant-gas', collapsed: false},
      {name: 'Soft Condensed Matter', code: 'cond-mat.soft', collapsed: false},
      {name: 'Statistical Mechanics', code: 'cond-mat.stat-mech', collapsed: false},
      {name: 'Strongly Correlated Electrons', code: 'cond-mat.str-el', collapsed: false},
      {name: 'Superconductivity', code: 'cond-mat.supr-con', collapsed: false},
    ],
  },
  {
    type: 'General Relativity and Quantum Cosmology',
    collapsed: false,
    code: '',
    sub: [],
  },
  {
    type: 'HEP - Experiment',
    collapsed: false,
    code: '',
    sub: [],
  },
  {
    type: 'HEP - Lattice',
    collapsed: false,
    code: '',
    sub: [],
  },
  {
    type: 'HEP - Phenomenology',
    collapsed: false,
    code: '',
    sub: [],
  },
  {
    type: 'HEP - Theory',
    collapsed: false,
    code: '',
    sub: [],
  },
  {
    type: 'Mathematical Physics',
    collapsed: false,
    code: '',
    sub: [],
  },
  {
    type: 'Nonlinear Sciences',
    collapsed: false,
    code: '',
    sub: [],
  },
  {
    type: 'Nuclear Experiment',
    collapsed: false,
    code: '',
    sub: [],
  },
  {
    type: 'Nuclear Theoryr',
    collapsed: false,
    code: '',
    sub: [],
  },
  {
    type: 'More Physics',
    collapsed: false,
    code: '',
    sub: [],
  },
  {
    type: 'Quantum Physics',
    collapsed: false,
    code: '',
    sub: [],
  },
  {
    type: 'Mathematics',
    collapsed: false,
    code: '',
    sub: [],
  },
  {
    type: 'Computer Science',
    collapsed: false,
    code: '',
    sub: [],
  },
  {
    type: 'Quantitative Biology',
    collapsed: false,
    code: '',
    sub: [],
  },
  {
    type: 'Quantitative Finance',
    collapsed: false,
    code: '',
    sub: [],
  },
  {
    type: 'Statistics',
    collapsed: false,
    code: '',
    sub: [],
  },
  {
    type: 'Economics',
    collapsed: false,
    code: '',
    sub: [
      {name: 'Econometrics', code: 'econ.EM', collapsed: false},
    ],
  },
];

class SubCategory extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      subCategoryCode: ''
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(category, subCategory) {
    return fetchSubCategory(category, subCategory);
  }
  // componentDidMount() {
    
  // }
  render() {
    return (
      <div className="b">
        {dataSource.map((node, i) => {
          const type = node.type;
          const label = <span className="node">{type}</span>;
          return (
            <TreeView key={type + '|' + i} nodeLabel={label} defaultCollapsed={true}>
              {node.sub.map(sub => {
                // const label2 = <span className="node">{sub.name}</span>;
                const subCode = `/${node.code}/${sub.code}`;
                return (
                  <div className="info">
                    <a
                      href={subCode}
                      // onCLick = {() => this.setState({
                      //                     subCategoryCode: sub.code
                      //                   })
                      // }
                      onCLick = {this.handleClick(node.code, sub.code)}
                      
                    >{sub.name}
                    </a>
                    <br /><br />
                  {/*<TreeView nodeLabel={label2} key={sub.name} defaultCollapsed={true}>
                    <div className="info">{sub.code}</div>
                  </TreeView>*/}
                </div>
                );
              })}
            </TreeView>
          );
        })}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  ...state
 })

const mapDispatchToProps = dispatch => ({
  fetchSubCategory: (category, subCategory) => dispatch(fetchSubCategory(category, subCategory))
 })

export default connect(mapStateToProps, mapDispatchToProps)(SubCategory);