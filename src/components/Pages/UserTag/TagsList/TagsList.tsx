import * as React from "react";
import * as Styled from "./TagsListStyles";
import moment from 'moment';
import { UIResponseTags } from "../../../../api/endpoints/tags/tagsTypes";
import { isApiResonseHasError } from "../../../../api/endpoints/common/errorDataUnpacker";
import { getTags } from "../../../../api/endpoints/tags/tags";
import Button from '../../../Common/Button';
import StandardInput from '../../../Common/StandardInput';
import { useHistory } from 'react-router-dom';
import CircularProgress from "@material-ui/core/CircularProgress";
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

const selectDays = {
  day: moment().subtract(1, 'days').toString(),
  sevenDays: moment().subtract(7, 'days').toString(),
  month: moment().subtract(1, 'month').toString(),
};

function isString(value: unknown): value is string {
  return typeof value === 'string';
}

const TagsList = () => {
  const [tags, setTags] = React.useState<UIResponseTags>();
  const [isLoading, setLoading] = React.useState<boolean>(false);
  const [searchTagValue, setSearchTagValue] = React.useState<string>("");
  const [selectDateValue, setSelectDateValue] = React.useState<string>(selectDays.day);
  const history = useHistory();

  React.useEffect(() => {
    fetchTags();
  }, [selectDateValue]);

  const fetchTags = async () => {
    setLoading(true);

    const tags = await getTags(selectDateValue);
    if (isApiResonseHasError(tags)) {
      setTags(tags);
    }
    setLoading(false);
  };

  const handleSearchTag = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;
    setSearchTagValue(value);
  };

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    history.push("/posts/" + searchTagValue);
  };

  const handleSelect = (event: React.ChangeEvent<{value: unknown}>) => {
    const value = event.target.value;
    if (isString(value)) {
      setSelectDateValue(value);
    }
  };

  return (
    <Styled.TagsList>
      {isLoading
        ? <CircularProgress />
        : (
          <>
            <Styled.TagForm onSubmit={handleFormSubmit}>
              <StandardInput
                label='Search'
                value={searchTagValue}
                name='searchTag'
                onChange={handleSearchTag}
              />
              <Button type='submit'>Go to tag</Button>
            </Styled.TagForm>
            <Styled.MostActive>
            <Styled.TagsText>
              Get most active tags from
            </Styled.TagsText>
            <Select
              value={selectDateValue}
              onChange={handleSelect}
            >
              <MenuItem value={selectDays.day}>1 day</MenuItem>
              <MenuItem value={selectDays.sevenDays}>7 days</MenuItem>
              <MenuItem value={selectDays.month}>1 Month</MenuItem>
            </Select>
            </Styled.MostActive>
            <Styled.TagsListElements>
              {tags?.tags.map(({ tagName, count }: { tagName: string, count: number }) => (
                <Styled.HashtagLink key={tagName} to={"/posts/" + tagName}>
                  {""} #{tagName}({count})
                </Styled.HashtagLink>
              ))}
            </Styled.TagsListElements>
          </>
      )}
    </Styled.TagsList>
  );
};

export default TagsList;