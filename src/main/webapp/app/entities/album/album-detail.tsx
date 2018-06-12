import * as React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction, byteSize, TextFormat } from 'react-jhipster';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './album.reducer';
import { IAlbum } from 'app/shared/model/album.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IAlbumDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: number }> {}

export class AlbumDetail extends React.Component<IAlbumDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { albumEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="galleryApp.album.detail.title">Album</Translate> [<b>{albumEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="title">
                <Translate contentKey="galleryApp.album.title">Title</Translate>
              </span>
            </dt>
            <dd>{albumEntity.title}</dd>
            <dt>
              <span id="description">
                <Translate contentKey="galleryApp.album.description">Description</Translate>
              </span>
            </dt>
            <dd>{albumEntity.description}</dd>
            <dt>
              <span id="created">
                <Translate contentKey="galleryApp.album.created">Created</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={albumEntity.created} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>
              <Translate contentKey="galleryApp.album.user">User</Translate>
            </dt>
            <dd>{albumEntity.user ? albumEntity.user.login : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/album" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>&nbsp;
          <Button tag={Link} to={`/entity/album/${albumEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ album }: IRootState) => ({
  albumEntity: album.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(AlbumDetail);
