import * as React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction, openFile, byteSize, TextFormat } from 'react-jhipster';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './photo.reducer';
import { IPhoto } from 'app/shared/model/photo.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IPhotoDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: number }> {}

export class PhotoDetail extends React.Component<IPhotoDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { photoEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="galleryApp.photo.detail.title">Photo</Translate> [<b>{photoEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="title">
                <Translate contentKey="galleryApp.photo.title">Title</Translate>
              </span>
            </dt>
            <dd>{photoEntity.title}</dd>
            <dt>
              <span id="description">
                <Translate contentKey="galleryApp.photo.description">Description</Translate>
              </span>
            </dt>
            <dd>{photoEntity.description}</dd>
            <dt>
              <span id="image">
                <Translate contentKey="galleryApp.photo.image">Image</Translate>
              </span>
            </dt>
            <dd>
              {photoEntity.image ? (
                <div>
                  <a onClick={openFile(photoEntity.imageContentType, photoEntity.image)}>
                    <img src={`data:${photoEntity.imageContentType};base64,${photoEntity.image}`} style={{ maxHeight: '30px' }} />
                  </a>
                  <span>
                    {photoEntity.imageContentType}, {byteSize(photoEntity.image)}
                  </span>
                </div>
              ) : null}
            </dd>
            <dt>
              <span id="takenOn">
                <Translate contentKey="galleryApp.photo.takenOn">Taken On</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={photoEntity.takenOn} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="uploadedOn">
                <Translate contentKey="galleryApp.photo.uploadedOn">Uploaded On</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={photoEntity.uploadedOn} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>
              <Translate contentKey="galleryApp.photo.album">Album</Translate>
            </dt>
            <dd>{photoEntity.album ? photoEntity.album.title : ''}</dd>
            <dt>
              <Translate contentKey="galleryApp.photo.tag">Tag</Translate>
            </dt>
            <dd>
              {photoEntity.tags
                ? photoEntity.tags.map((val, i) => (
                    <span key={val.id}>
                      <a>{val.name}</a>
                      {i === photoEntity.tags.length - 1 ? '' : ', '}
                    </span>
                  ))
                : null}
            </dd>
          </dl>
          <Button tag={Link} to="/entity/photo" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>&nbsp;
          <Button tag={Link} to={`/entity/photo/${photoEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.edit">Edit</Translate>
            </span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ photo }: IRootState) => ({
  photoEntity: photo.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PhotoDetail);
