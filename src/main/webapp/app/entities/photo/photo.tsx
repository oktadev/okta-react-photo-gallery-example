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
import Gallery from 'react-photo-gallery';
import Lightbox from 'react-images';

export interface IPhotoProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface IPhotoState extends IPaginationBaseState {
  currentImage: number;
  lightboxIsOpen: boolean;
}

export class Photo extends React.Component<IPhotoProps, IPhotoState> {
  state: IPhotoState = {
    ...getSortState(this.props.location, ITEMS_PER_PAGE),
    currentImage: 0,
    lightboxIsOpen: false
  };

  constructor(props) {
    super(props);
    this.closeLightbox = this.closeLightbox.bind(this);
    this.openLightbox = this.openLightbox.bind(this);
    this.gotoNext = this.gotoNext.bind(this);
    this.gotoPrevious = this.gotoPrevious.bind(this);
  }

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

  openLightbox(event, obj) {
    this.setState({
      currentImage: obj.index,
      lightboxIsOpen: true
    });
  }

  closeLightbox() {
    this.setState({
      currentImage: 0,
      lightboxIsOpen: false
    });
  }

  gotoPrevious() {
    this.setState({
      currentImage: this.state.currentImage - 1
    });
  }

  gotoNext() {
    this.setState({
      currentImage: this.state.currentImage + 1
    });
  }

  render() {
    const { photoList, match } = this.props;
    const photoSet = photoList.map((photo, i) => ({
      src: `data:${photo.imageContentType};base64,${photo.image}`,
      width: photo.height > photo.width ? 3 : photo.height === photo.width ? 1 : 4,
      height: photo.height > photo.width ? 4 : photo.height === photo.width ? 1 : 3
    }));

    return (
      <div>
        <h2 id="photo-heading">
          <Translate contentKey="galleryApp.photo.home.title">Photos</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />&nbsp;
            <Translate contentKey="galleryApp.photo.home.createLabel">Create new Photo</Translate>
          </Link>
        </h2>
        <Gallery photos={photoSet} onClick={this.openLightbox} />
        <Lightbox
          images={photoSet}
          onClose={this.closeLightbox}
          onClickPrev={this.gotoPrevious}
          onClickNext={this.gotoNext}
          currentImage={this.state.currentImage}
          isOpen={this.state.lightboxIsOpen}
        />
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
                  <th className="hand" onClick={this.sort('height')}>
                    <Translate contentKey="galleryApp.photo.height">Height</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('width')}>
                    <Translate contentKey="galleryApp.photo.width">Width</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('taken')}>
                    <Translate contentKey="galleryApp.photo.taken">Taken</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('uploaded')}>
                    <Translate contentKey="galleryApp.photo.uploaded">Uploaded</Translate> <FontAwesomeIcon icon="sort" />
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
                    <td>{photo.height}</td>
                    <td>{photo.width}</td>
                    <td>
                      <TextFormat type="date" value={photo.taken} format={APP_DATE_FORMAT} />
                    </td>
                    <td>
                      <TextFormat type="date" value={photo.uploaded} format={APP_DATE_FORMAT} />
                    </td>
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
