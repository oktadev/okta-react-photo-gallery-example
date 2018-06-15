import * as React from 'react';
import * as InfiniteScroll from 'react-infinite-scroller';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { openFile, byteSize, Translate, ICrudGetAllAction, TextFormat, getSortState, IPaginationBaseState } from 'react-jhipster';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities, reset } from './photo.reducer';
import { IPhoto } from 'app/shared/model/photo.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';
// import PhotoGrid from 'react-photo-feed';

export interface IPhotoProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export type IPhotoState = IPaginationBaseState;

export class Photo extends React.Component<IPhotoProps, IPhotoState> {
  state: IPhotoState = {
    ...getSortState(this.props.location, ITEMS_PER_PAGE)
  };

  componentDidMount() {
    this.reset();
  }

  reset = () => {
    this.props.reset();
    this.setState({ activePage: 1 }, () => this.getEntities());
  };

  handleLoadMore = page => {
    this.setState({ activePage: this.state.activePage + 1 }, () => this.getEntities());
  };

  sort = prop => () => {
    this.setState(
      {
        order: this.state.order === 'asc' ? 'desc' : 'asc',
        sort: prop
      },
      () => this.reset()
    );
  };

  getEntities = () => {
    const { activePage, itemsPerPage, sort, order } = this.state;
    this.props.getEntities(activePage - 1, itemsPerPage, `${sort},${order}`);
  };

  render() {
    const { photoList, match } = this.props;
    const demoPhotos = [
      {
        id: 1,
        src: 'https://farm5.staticflickr.com/4077/34824083444_f5f050e31c_n.jpg',
        bigSrc: 'https://farm5.staticflickr.com/4077/34824083444_f5f050e31c_b.jpg'
      },
      {
        id: 2,
        src: 'https://farm5.staticflickr.com/4240/35527849422_25a0a67df6_n.jpg',
        bigSrc: 'https://farm5.staticflickr.com/4240/35527849422_25a0a67df6_b.jpg'
      },
      {
        id: 3,
        src: 'https://farm5.staticflickr.com/4077/34824083444_f5f050e31c_n.jpg',
        bigSrc: 'https://farm5.staticflickr.com/4077/34824083444_f5f050e31c_b.jpg'
      },
      {
        id: 4,
        src: 'https://farm5.staticflickr.com/4240/35527849422_25a0a67df6_n.jpg',
        bigSrc: 'https://farm5.staticflickr.com/4240/35527849422_25a0a67df6_b.jpg'
      },
      {
        id: 5,
        src: 'https://farm5.staticflickr.com/4077/34824083444_f5f050e31c_n.jpg',
        bigSrc: 'https://farm5.staticflickr.com/4077/34824083444_f5f050e31c_b.jpg'
      },
      {
        id: 6,
        src: 'https://farm5.staticflickr.com/4240/35527849422_25a0a67df6_n.jpg',
        bigSrc: 'https://farm5.staticflickr.com/4240/35527849422_25a0a67df6_b.jpg'
      },
      {
        id: 7,
        src: 'https://farm5.staticflickr.com/4077/34824083444_f5f050e31c_n.jpg',
        bigSrc: 'https://farm5.staticflickr.com/4077/34824083444_f5f050e31c_b.jpg'
      }
    ];
    return (
      <div>
        <h2 id="photo-heading">
          <Translate contentKey="galleryApp.photo.home.title">Photos</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />&nbsp;
            <Translate contentKey="galleryApp.photo.home.createLabel">Create new Photo</Translate>
          </Link>
        </h2>
        <div className="table-responsive">
          <InfiniteScroll
            pageStart={this.state.activePage}
            loadMore={this.handleLoadMore}
            hasMore={this.state.activePage <= this.props.links.last}
            loader={<div className="loader">Loading ...</div>}
            threshold={0}
            initialLoad={false}
          >
            <Table responsive>
              <thead>
                <tr>
                  <th className="hand" onClick={this.sort('id')}>
                    <Translate contentKey="global.field.id">ID</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('title')}>
                    <Translate contentKey="galleryApp.photo.title">Title</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('description')}>
                    <Translate contentKey="galleryApp.photo.description">Description</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('image')}>
                    <Translate contentKey="galleryApp.photo.image">Image</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('takenOn')}>
                    <Translate contentKey="galleryApp.photo.takenOn">Taken On</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('uploadedOn')}>
                    <Translate contentKey="galleryApp.photo.uploadedOn">Uploaded On</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('open')}>
                    <Translate contentKey="galleryApp.photo.open">Open</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th>
                    <Translate contentKey="galleryApp.photo.album">Album</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {photoList.map((photo, i) => (
                  <tr key={`entity-${i}`}>
                    <td>
                      <Button tag={Link} to={`${match.url}/${photo.id}`} color="link" size="sm">
                        {photo.id}
                      </Button>
                    </td>
                    <td>{photo.title}</td>
                    <td>{photo.description}</td>
                    <td>
                      {photo.image ? (
                        <div>
                          <a onClick={openFile(photo.imageContentType, photo.image)}>
                            <img src={`data:${photo.imageContentType};base64,${photo.image}`} style={{ maxHeight: '30px' }} />
                            &nbsp;
                          </a>
                          <span>
                            {photo.imageContentType}, {byteSize(photo.image)}
                          </span>
                        </div>
                      ) : null}
                    </td>
                    <td>
                      <TextFormat type="date" value={photo.takenOn} format={APP_DATE_FORMAT} />
                    </td>
                    <td>
                      <TextFormat type="date" value={photo.uploadedOn} format={APP_DATE_FORMAT} />
                    </td>
                    <td>{photo.open ? 'true' : 'false'}</td>
                    <td>{photo.album ? <Link to={`album/${photo.album.id}`}>{photo.album.title}</Link> : ''}</td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`${match.url}/${photo.id}`} color="info" size="sm">
                          <FontAwesomeIcon icon="eye" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.view">View</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${photo.id}/edit`} color="primary" size="sm">
                          <FontAwesomeIcon icon="pencil-alt" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.edit">Edit</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${photo.id}/delete`} color="danger" size="sm">
                          <FontAwesomeIcon icon="trash" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.delete">Delete</Translate>
                          </span>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </InfiniteScroll>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ photo }: IRootState) => ({
  photoList: photo.entities,
  totalItems: photo.totalItems,
  links: photo.links
});

const mapDispatchToProps = {
  getEntities,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Photo);
